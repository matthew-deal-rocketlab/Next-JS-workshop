import { dbQuery } from '../services/db';
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_NO_DB,
  RESULT_OK,
  SALT_PASS_SEPARATOR,
} from '../constants';
import { getUserJWT, getUserRefreshToken, hashPassword } from '../utils/auth';
import { uuidv4 } from '../utils/misc';
import { sendEmail } from '../services/email';

const getUserbyEmail = async (
  db: DBConnection,
  email: string,
): Promise<JsonQLOutput | string> => {
  const queryUserByEmail = 'SELECT * FROM tbl_users WHERE email = $1';
  let result = null;

  try {
    result = await dbQuery(db, queryUserByEmail, [email]);
    if (!result || result.rowCount == 0) return 'no result';
  } catch (err) {
    return `ERROR: ${err}`;
  }

  return result.rows[0];
};

const emailExists = async (
  db: DBConnection,
  email: string,
): Promise<boolean> => {
  const userInfo = await getUserbyEmail(db, email);
  return typeof userInfo !== 'string';
};

// Inserts a user into the database
// Returns an empty string on success or the error message desribing problem
const addUser = async (
  db: DBConnection,
  email: string,
  password: string,
  firstname: string = '',
  lastname: string = '',
): Promise<OkString | string> => {
  const queryAddUser =
    'INSERT INTO tbl_users (email, pass, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id';

  let result = null;
  const parameters = [email, password, firstname, lastname];
  try {
    result = await dbQuery(db, queryAddUser, parameters);
    if (!result || result.rowCount !== 1) return 'could not add user';
  } catch (err) {
    return `ERROR: ${err}`;
  }

  return { value: result.rows[0]['id'] };
};

// Adds a user in the system
const userSignup = async (input: JsonQLInput, rc: ResolverContext) => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputEmail = (input['email'] as string) ?? '';
  const inputPass = (input['pass'] as string) ?? '';

  if (await emailExists(rc.db, inputEmail))
    return { error: 'email already exists' };

  // add user
  const salt = uuidv4(false);
  const hashedPassword = hashPassword(inputPass, salt);
  const savedPassword = `${salt}${SALT_PASS_SEPARATOR}${hashedPassword}`;
  const addResult = await addUser(
    rc.db,
    inputEmail.toLowerCase(),
    savedPassword,
  );
  if (!addResult || typeof addResult === 'string')
    return { error: `error: ${addResult}` };

  return { result: addResult.value };
};

const userLogin = async (input: JsonQLInput, rc: ResolverContext) => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputEmail = (input['email'] as string) ?? '';
  const inputPass = (input['pass'] as string) ?? '';

  const userInfo = await getUserbyEmail(rc.db, inputEmail.toLowerCase());
  if (typeof userInfo === 'string') return ERROR_INVALID_CREDENTIALS;

  // compare password
  const saltPassCombined = (userInfo['pass'] ?? '') as string;
  const saltPass = saltPassCombined.split(SALT_PASS_SEPARATOR);
  const salt = saltPass[0] ?? '';
  const password = saltPass[1];

  if (hashPassword(inputPass, salt) !== password)
    return ERROR_INVALID_CREDENTIALS;

  // Generate JWT and refreshToken for user
  const userId = ((userInfo['id'] ?? '') as string).replaceAll('-', '');
  const userJwt = getUserJWT(userId);
  const userRefreshToken = getUserRefreshToken(userId);

  // Get other user details
  const firstname = (userInfo['firstname'] ?? '') as string;

  return {
    result: {
      firstname: firstname,
      token: userJwt,
      refreshToken: userRefreshToken,
    },
  };
};

// Initiates sending an email to reset password
const userForgotPassword = async (input: JsonQLInput, rc: ResolverContext) => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputEmail = (input['email'] as string) ?? '';

  const userInfo = await getUserbyEmail(rc.db, inputEmail.toLowerCase());
  if (typeof userInfo === 'string') return RESULT_OK;

  const userEmail = (userInfo['email'] ?? '') as string;
  if (!userEmail) return RESULT_OK;

  // save unique code into user session column

  // finally send email
  await sendEmail(
    userEmail,
    'password reset',
    'click here to reset your password',
  );

  return RESULT_OK;
};

export { userSignup, userLogin, userForgotPassword };
