import { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

import schema from '../schema/schema'
import { resolverMap } from '../schema/schema-resolver-map'
import { API_PREFIX } from '../constants'
import { dbConnect } from '../services/db'
import { validateToken } from '../utils/auth'

const gqlHelperMiddleware = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body }
    }
    next()
  },
]

const getContext = async (req: Request) => {
  const db = await dbConnect()

  // builder resolver context
  const userOrError = validateToken(req)
  if (req.headers['authorization'] && userOrError.error) {
    // const errorCode = userOrError.error === ERROR_TOKEN_EXPIRED.error ? ApiStatus.EXPIRED : ApiStatus.ERROR
    // res.status(errorCode).send({ error: userOrError.error })
    return { userid: 0, useruid: '', db }
  }

  const userIdentified = (userOrError.result as StringMap) ?? {
    id: 0,
    uid: '',
  }

  const rc: ResolverContext = {
    userid: (userIdentified['id'] ?? 0) as number,
    useruid: (userIdentified['uid'] ?? '') as string,
    db,
  }

  return rc
}

const addGraphQL = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolverMap,
  })

  await server.start()
  // add GraphQL endpoint
  const apolloMiddleWare = expressMiddleware(server, {
    context: async ({ req }) => await getContext(req),
  })

  app.use(`${API_PREFIX}/graphql`, gqlHelperMiddleware, apolloMiddleWare)
}
export default addGraphQL
