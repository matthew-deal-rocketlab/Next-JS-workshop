import express, { NextFunction, Request, Response } from 'express'

import addRoutes from './routes/routes'
import addGraphQL from './routes/graphql'

const app = express()
const port = process.env.PORT || 80

const main = async () => {
  // CORS middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(`Access-Control-Allow-Origin`, `*`)
    res.header(`Access-Control-Allow-Methods`, `GET,POST`)
    res.header(`Access-Control-Allow-Headers`, `Content-Type,Authorization,x-api-key`)
    next()
  })

  // add REST endpoints
  addRoutes(app)

  // add graphQL endpoint
  await addGraphQL(app)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
