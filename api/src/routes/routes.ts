import express, { Express, NextFunction, Request, Response } from 'express';

import { API_PREFIX } from '../constants';
import { getTime, getVersion } from '../resolvers/utils';
import { sysCheck } from '../resolvers/syscheck';
import { authForgotPassword, authLogin, authLogout, authRefresh, authResetPassword, authSignup, authVerify } from '../resolvers/auth';
import { userRead, userUpdate } from '../resolvers/user';
import { dbClose, dbConnect } from '../services/db';
import { validateAPIKey, validateToken } from '../utils/auth';
import { siteListRead, siteListUpdate, siteSettingsRead, siteSettingsUpdate } from '../resolvers/site';

const prnt = console.log;

const MAX_REQUESTS = 10;

const resolverMap = new Map();
resolverMap.set('time', getTime);
resolverMap.set('version', getVersion);

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

// site
resolverMap.set('siteListRead', siteListRead);
resolverMap.set('siteListUpdate', siteListUpdate);
resolverMap.set('siteSettingsRead', siteSettingsRead);
resolverMap.set('siteSettingsUpdate', siteSettingsUpdate);



const jsonErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof SyntaxError && 'body' in err) {
    let formattedError = { status: 400, message: err.message };
    return res.status(400).json(formattedError);
  }
  next();
};

const funcWrapper = async (
  fnName: string,
  fn: (o: object, r: ResolverContext) => Promise<FnResult>,
  input: object,
  rc: ResolverContext,
): Promise<object> => {
  const res = await fn(input, rc);
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

      const rc: ResolverContext = { useruid: '', db: null };
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
        return res.status(400).send({ error: 'invalid request' });

      // builder resolver context
      const userIdOrError = validateToken(req);
      if (req.headers['authorization'] && userIdOrError.error) {
        return res.status(400).send({ error: userIdOrError.error });
      }

      const rc: ResolverContext = {
        useruid: userIdOrError.result ?? '',
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

      await dbClose(rc.db);

      // reformat output from an array of objects to one object
      let result: JsonQLOutput = {};
      resultArray.forEach(resultItem => {
        result = Object.assign(result, resultItem);
      });

      return res.json(result);
    },
  );
};

export default addRoutes;
