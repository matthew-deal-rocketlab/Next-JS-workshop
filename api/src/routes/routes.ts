import express, { Express, NextFunction, Request, Response } from 'express';

import { API_PREFIX, ApiStatus, ERROR_TOKEN_EXPIRED } from '../constants';
import { getFakeUsers, getTime, getVersion } from '../resolvers/utils';
import { sysCheck } from '../resolvers/syscheck';
import { authForgotPassword, authLogin, authLogout, authRefresh, authResetPassword, authSignup, authVerify } from '../resolvers/auth';
import { userRead, userUpdate } from '../resolvers/user';
import { dbClose, dbConnect } from '../services/db';
import { validateAPIKey, validateToken } from '../utils/auth';
import { crudCreate, crudDelete, crudRead, crudUpdate } from '../resolvers/crud';
import { fetchCardData } from '../resolvers/examples';

const prnt = console.log;

const MAX_REQUESTS = 10;

const resolverMap = new Map();
resolverMap.set('time', getTime);
resolverMap.set('version', getVersion);
resolverMap.set('fakeUsers', getFakeUsers);


// authentication
resolverMap.set('authSignup', authSignup);
resolverMap.set('authVerify', authVerify);
resolverMap.set('authForgotPassword', authForgotPassword);
resolverMap.set('authResetPassword', authResetPassword);
resolverMap.set('authRefresh', authRefresh);
resolverMap.set('authLogin', authLogin);
resolverMap.set('authLogout', authLogout);

// user management
resolverMap.set('userRead', userRead);
resolverMap.set('userUpdate', userUpdate);

// crud operations
resolverMap.set('crudCreate', crudCreate);
resolverMap.set('crudRead', crudRead);
resolverMap.set('crudUpdate', crudUpdate);
resolverMap.set('crudDelete', crudDelete);

// exmaples, streaming, invoices, etc...
resolverMap.set('fetchCardData', fetchCardData); 



const jsonErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof SyntaxError && 'body' in err) {
    let formattedError = { status: ApiStatus.ERROR, message: err.message };
    return res.status(ApiStatus.ERROR).json(formattedError);
  }
  next();
};

const funcWrapper = async (
  fnName: string,
  fn: (o: object, r: ResolverContext) => Promise<FnResult>,
  input: object,
  rc: ResolverContext,
): Promise<object> => {
  let res: FnResult;
  try {
    res = await fn(input, rc);
  } catch (_) {
    return { [fnName]: 'unknown error' };
  }

  // if returned object contains a key named `error` that is a string, then return the string instead
  const output = typeof res.error === 'string' ? res.error : res;

  if (typeof output === 'string' || typeof output.result === 'string') return { [fnName]: output };
  return { [fnName]: output.result };
};

const addRoutes = (app: Express) => {
  // This should be the only API endpoint that has no API key protection
  app.get(
    `${API_PREFIX}/healthcheck`,
    (req: Request, res: Response): Response => {
      prnt(`${req.method} ${req.path}`);
      return res.json({
        status: 'ok',
        time: new Date().toISOString(),
        version: '2023.08.03',
      });
    },
  );

  app.get(
    `${API_PREFIX}/syscheck`,
    async (req: Request, res: Response): Promise<Response> => {
      if (!validateAPIKey(req)) return res.end();

      const rc: ResolverContext = { userid: 0, useruid: '', db: null };
      const result = await sysCheck({}, rc);
      return res.json(result);
    },
  );

  app.post(
    `${API_PREFIX}/jsonql`,
    express.json(),
    jsonErrorHandler,
    async (req: Request, res: Response): Promise<Response> => {
      if (!validateAPIKey(req)) return res.end();

      // check input
      const reqKeys = Object.keys(req.body);
      if (reqKeys.length === 0)
        return res.status(ApiStatus.ERROR).send({ error: 'invalid request' });

      // builder resolver context
      const userOrError = validateToken(req);
      if (req.headers['authorization'] && userOrError.error) {
        const errorCode = userOrError.error === ERROR_TOKEN_EXPIRED.error ? ApiStatus.EXPIRED : ApiStatus.ERROR;
        return res.status(errorCode).send({ error: userOrError.error });
      }

      const userIdentified = userOrError.result as StringMap ?? { id: 0, uid: '' };
      const rc: ResolverContext = {
        userid: (userIdentified['id'] ?? 0) as number,
        useruid: (userIdentified['uid'] ?? '') as string,
        db: await dbConnect(),
      };

      const requests = [];
      var keyCount = 0;
      for (const reqKey of reqKeys) {
        const fn = resolverMap.get(reqKey);
        const input = req.body[reqKey];
        if (fn !== undefined) requests.push(funcWrapper(reqKey, fn, input, rc));
        keyCount++;
        if (keyCount > MAX_REQUESTS) break;
      }

      const resultArray = await Promise.all(requests);

      console.log('resultArray', resultArray)

      await dbClose(rc.db);

      // reformat output from an array of objects to one object
      let result: JsonQLOutput = {};
      resultArray.forEach(resultItem => {
        result = Object.assign(result, resultItem);
      });

      return res.json(result);
    },
  );
  // app.post(
  //   `${API_PREFIX}/example`,
  //   express.json(),
  //   jsonErrorHandler,
  //   async (req: Request, res: Response): Promise<Response> => {
  //     if (!validateAPIKey(req)) return res.end();

  //     // check input
  //     const reqKeys = Object.keys(req.body);
  //     if (reqKeys.length === 0)
  //       return res.status(ApiStatus.ERROR).send({ error: 'invalid request' });

};

export default addRoutes;
