import { Express, Request, Response } from 'express'

import { API_PREFIX, EMPTY_RESOLVER_CONTEXT } from '../constants'
import { sysCheck } from '../resolvers/syscheck'
import { validateAPIKey } from '../utils/auth'

const prnt = console.log

const addRoutes = (app: Express) => {
  // This should be the only API endpoint that has no API key protection
  app.get(`${API_PREFIX}/healthcheck`, (req: Request, res: Response): Response => {
    prnt(`${req.method} ${req.path}`)
    return res.json({
      status: 'ok',
      time: new Date().toISOString(),
      version: '2023.08.03',
    })
  })

  app.get(`${API_PREFIX}/syscheck`, async (req: Request, res: Response): Promise<Response> => {
    if (!validateAPIKey(req)) return res.end()

    const result = await sysCheck({}, EMPTY_RESOLVER_CONTEXT)
    return res.json(result)
  })

  app.get(`${API_PREFIX}/download`, (req, res) => {
    console.log(req.headers)

    res.json({ status: 'ok' })
  })

  // app.post(`${API_PREFIX}/upload`, upload.single('attachment'), (req, res, next) => {
  //   if (req.file) {
  //     console.log(req.range())
  //     console.log(req.file)

  //     return res.json(req.file)
  //   }

  //   res.status(ApiStatus.ERROR).send({ error: 'Could not upload file' })
  // })
}

export default addRoutes
