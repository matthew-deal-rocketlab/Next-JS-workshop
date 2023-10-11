import { dbQuery, DBConnection } from '../services/db';
import {
  ERROR_DB_UPDATE,
  ERROR_INVALID_CREDENTIALS,
  ERROR_INVALID_INPUT,
  ERROR_NO_DB,
  ERROR_USER_UNVERIFIED,
  RESULT_OK,
  SALT_PASS_SEPARATOR,
  UserStatus,
} from '../constants';
import { getUserJWT, getUserRefreshToken, hashPassword, validateRefreshToken } from '../utils/auth';
import { uuidv4 } from '../utils/misc';
import { sendEmail } from '../services/email';
import { getUserBy } from '../utils/db';
import { isEmail } from '../utils/validators';


const emailExists = async (
  db: DBConnection,
  email: string,
): Promise<boolean> => {
  const userInfo = await getUserBy(db, 'email', email);
  return typeof userInfo !== 'string';
};

// Inserts a user into the database
// Returns an empty string on success or the error message desribing problem
const addUser = async (
  db: DBConnection,
  email: string,
  password: string,
  verifyCode: string,
  firstname: string = '',
  lastname: string = '',
): Promise<OkString | string> => {
  const queryAddUser =
    `INSERT INTO tbl_user (status, email, pass, firstname, lastname, verify_code) ` +
    `VALUES ($1, $2, $3, $4, $5, $6) RETURNING uid`;

  let result = null;
  // TODO const parameters = [UserStatus.Pending, email, password, firstname, lastname, verifyCode];
  const parameters = [UserStatus.Verified, email, password, firstname, lastname, verifyCode];

  result = await dbQuery(db, queryAddUser, parameters);
  if (result.error) return result.error;
  if (!result || result.rowCount !== 1) return 'could not add user';

  return { value: result.rows[0]['uid'] };
};

// Adds a user in the system
export const authSignup = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters. firstname and lastname is optional
  const inputEmail = (input['email'] ?? '') as string;
  const inputPass = (input['pass'] ?? '') as string;
  const inputFirstname = (input['firstname'] ?? '') as string;
  const inputLastname = (input['lastname'] ?? '') as string;

  if (!inputEmail || !inputPass || !isEmail(inputEmail)) return ERROR_INVALID_INPUT;

  if (await emailExists(rc.db, inputEmail))
    return { error: 'email already exists' };

  // add user
  const salt = uuidv4(false);
  const hashedPassword = hashPassword(inputPass, salt);
  const savedPassword = `${salt}${SALT_PASS_SEPARATOR}${hashedPassword}`;

  const verifyCode = uuidv4(false);

  const addResult = await addUser(
    rc.db,
    inputEmail.toLowerCase(),
    savedPassword,
    verifyCode,
    inputFirstname.trim(),
    inputLastname.trim(),
  );
  if (!addResult || typeof addResult === 'string')
    return { error: `error: ${addResult}` };

  // send verification email
  sendEmail(
    inputEmail,
    'Please verify your email',
    `call authVerify API with this code to verify your email ${verifyCode}`,
  );

  return { result: addResult.value };
};

export const authVerify = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputCode = (input['code'] as string) ?? '';
  if (!inputCode || inputCode.length !== 32) return ERROR_INVALID_INPUT;

  // set user status to verified and clear user verify code
  const queryVerifyUser = `UPDATE tbl_user SET status = '${UserStatus.Verified}', verify_code = null WHERE ` +
    `verify_code = $1 AND status = '${UserStatus.Pending}' RETURNING uid`

  let result1 = null;
  result1 = await dbQuery(rc.db!, queryVerifyUser, [inputCode]);
  if (result1.error) return { error: result1.error };
  if (!result1 || result1.rowCount !== 1) return ERROR_DB_UPDATE;

  const userId = result1.rows[0]['id']

  // add row for user details
  const queryAddUserDetails = 'INSERT INTO tbl_user_detail (user_id) VALUES ($1)'
  let result2 = null;
  result2 = await dbQuery(rc.db!, queryAddUserDetails, [userId]);
  if (result2.error) return { error: result2.error };
  if (!result2 || result2.rowCount !== 1) return ERROR_DB_UPDATE;


  return RESULT_OK;
}

const saveRefreshToken = async (db: DBConnection, userId: string, refreshToken: string): Promise<JsonQLOutput> => {
  const querySetSession = `UPDATE tbl_user SET session = $1 WHERE id = $2`
  let result = null;
  result = await dbQuery(db, querySetSession, [refreshToken, userId]);
  if (result.error) return { error: result.error };
  if (!result || result.rowCount !== 1) return ERROR_DB_UPDATE;

  return RESULT_OK;
}

export const authLogin = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputEmail = (input['email'] as string) ?? '';
  const inputPass = (input['pass'] as string) ?? '';
  if (!inputEmail || !inputPass || !isEmail(inputEmail)) return ERROR_INVALID_INPUT;

  const userInfo = await getUserBy(rc.db, 'email', inputEmail.toLowerCase());
  if (typeof userInfo === 'string') return ERROR_INVALID_CREDENTIALS;

  // compare password
  const saltPassCombined = (userInfo['pass'] ?? '') as string;
  const saltPass = saltPassCombined.split(SALT_PASS_SEPARATOR);
  const salt = saltPass[0] ?? '';
  const password = saltPass[1];

  if (hashPassword(inputPass, salt) !== password)
    return ERROR_INVALID_CREDENTIALS;

  // Check if user is activated only after password has been verified
  if (userInfo['status'] !== UserStatus.Verified) return ERROR_USER_UNVERIFIED;

  // Generate JWT and refreshToken for user
  const userId = (userInfo['id'] ?? 0) as number
  const userUid = ((userInfo['uid'] ?? '') as string).replaceAll('-', '');
  const userJwt = getUserJWT(userId, userUid);
  const userRefreshToken = getUserRefreshToken(userUid);

  // Save refresh token
  const saveResult = await saveRefreshToken(rc.db!, (userInfo['id'] ?? '') as string, userRefreshToken);
  if (saveResult.error) return { error: saveResult.error };

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

export const authLogout = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;
  const useruid = rc.useruid;
  if (!useruid) return ERROR_INVALID_CREDENTIALS;

  const querySetVerifyCode = `UPDATE tbl_user SET session = '' WHERE uid = $1`
  let result = null;
  result = await dbQuery(rc.db!, querySetVerifyCode, [useruid]);
  if (result.error) return { error: result.error }
  if (!result || result.rowCount !== 1) return ERROR_DB_UPDATE;

  return RESULT_OK;
}

export const authRefresh = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;

  const refreshToken = (input['refreshToken'] as string) ?? '';
  if (!refreshToken) return ERROR_INVALID_INPUT;

  const rtResult = validateRefreshToken(refreshToken);
  if (rtResult.error || !rtResult.userId) return ERROR_INVALID_INPUT;

  // refresh token passes all tests. Check if it exists in database to confirm authenticity
  const userInfo = await getUserBy(rc.db, 'session', refreshToken);
  if (typeof userInfo === 'string') return ERROR_INVALID_CREDENTIALS;

  // compare user uuid in token with database
  const dbUserUUID = (userInfo['uid'] ?? '') as string
  const tokenUserUUID = rtResult.userId;
  const isTokenGood = dbUserUUID.replaceAll('-', '') === tokenUserUUID;
  if (!isTokenGood) return ERROR_INVALID_CREDENTIALS;

  // Generate JWT and refreshToken for user
  const userId = (userInfo['id'] ?? 0) as number
  const userUid = ((userInfo['uid'] ?? '') as string).replaceAll('-', '');
  const userJwt = getUserJWT(userId, userUid);
  const now = new Date();
  if (now < rtResult.renewDate!) {
    return { result: { token: userJwt, refreshToken: refreshToken } };
  }

  const newRefreshToken = getUserRefreshToken(userUid);

  // Save refresh token
  const saveResult = await saveRefreshToken(rc.db!, userUid, newRefreshToken);
  if (saveResult.error) return { error: saveResult.error };

  return { result: { token: userJwt, refreshToken: newRefreshToken } };
}

// Initiates sending an email to reset password
export const authForgotPassword = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputEmail = (input['email'] as string) ?? '';
  if (!inputEmail || !isEmail(inputEmail)) return ERROR_INVALID_INPUT;

  const userEmail = inputEmail.toLowerCase();

  // save unique code into user verify_code column
  const newCode = uuidv4(false);
  const querySetVerifyCode = `UPDATE tbl_user SET verify_code = $1 WHERE email = $2 AND ` +
    `(status = '${UserStatus.Verified}' OR status = '${UserStatus.Pending}')`

  let result = null;
  result = await dbQuery(rc.db!, querySetVerifyCode, [newCode, userEmail]);
  if (result.error) return { error: result.error }
  if (!result || result.rowCount !== 1) return ERROR_DB_UPDATE;

  // finally send email
  await sendEmail(
    userEmail,
    'password reset',
    `call authResetPassword API with this code to reset your password ${newCode}`,
  );

  return RESULT_OK;
};


export const authResetPassword = async (input: JsonQLInput, rc: ResolverContext): Promise<JsonQLOutput> => {
  if (!rc.db) return ERROR_NO_DB;

  // get input parameters
  const inputCode = (input['code'] as string) ?? '';
  const inputNewPass = (input['newpass'] as string) ?? '';
  if (!inputCode || !inputNewPass || inputCode.length !== 32) return ERROR_INVALID_INPUT;

  // check code in database
  const userInfo = await getUserBy(rc.db, 'verify_code', inputCode);
  if (typeof userInfo === 'string') return ERROR_INVALID_INPUT;

  const userEmail = (userInfo['email'] ?? '') as string;
  if (!userEmail) return ERROR_INVALID_INPUT;

  // Create new hashed password
  const salt = uuidv4(false);
  const hashedPassword = hashPassword(inputNewPass, salt);
  const savedPassword = `${salt}${SALT_PASS_SEPARATOR}${hashedPassword}`;

  // save new password and clear verification code
  const querySetPass = `UPDATE tbl_user SET pass = $1, verify_code = null WHERE id = $2`
  let result = null;
  result = await dbQuery(rc.db!, querySetPass, [savedPassword, userInfo['id']]);
  if (result.error) return { error: result.error }
  if (!result || result.rowCount !== 1) return ERROR_DB_UPDATE;

  return RESULT_OK;
}
