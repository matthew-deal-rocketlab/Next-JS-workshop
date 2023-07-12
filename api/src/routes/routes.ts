import express, { Express, NextFunction, Request, Response } from "express";

import { API_HEADER, API_KEY, API_PREFIX } from "../constants";
import { getTime, getVersion } from "../resolvers/utils";
import { sysCheck } from "../resolvers/syscheck";

const prnt = console.log;

const MAX_REQUESTS = 10;

const resolverMap = new Map();
resolverMap.set("time", getTime);
resolverMap.set("version", getVersion);

const jsonErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError && "body" in err) {
    let formattedError = { status: 400, message: err.message };
    return res.status(400).json(formattedError);
  }
  next();
};

const funcWrapper = async (
  fnName: string,
  fn: Function,
  input: object,
  rc: ResolverContext
): Promise<object> => {
  const res = await fn(input, rc);
  // if returned object contains a key named `error` that is a string, then return the string instead
  const output = typeof res.error === "string" ? res.error : res;

  const result = new Map();
  result.set(fnName, output);
  return Object.fromEntries(result);
};

const addRoutes = (app: Express) => {
  app.get(
    `${API_PREFIX}/healthcheck`,
    (req: Request, res: Response): Response => {
      prnt(`${req.method} ${req.path}`);
      return res.json({
        status: "ok",
        time: new Date().toISOString(),
        version: "2023.07.10",
      });
    }
  );

  app.get(
    `${API_PREFIX}/syscheck`,
    async (req: Request, res: Response): Promise<Response> => {
      const rc: ResolverContext = { userid: "", db: null };
      const result = await sysCheck({}, rc);
      return res.json(result);
    }
  );

  app.post(
    `${API_PREFIX}/jsonql`,
    express.json(),
    jsonErrorHandler,
    async (req: Request, res: Response): Promise<Response> => {
      const apikey = req.headers[API_HEADER];

      if (apikey !== API_KEY) {
        req.socket.end();
        return res.end();
      }

      // check input
      const reqKeys = Object.keys(req.body);
      if (reqKeys.length === 0)
        return res.status(400).send({ error: "invalid request" });

      // builder resolver context
      const rc: ResolverContext = {
        userid: "",
        db: null,
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

      const results = await Promise.all(requests);

      return res.json(results);
    }
  );
};

export default addRoutes;
