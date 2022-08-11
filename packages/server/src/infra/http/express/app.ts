import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { Route } from '@/infra/http/express/routes'

dotenv.config()

export class ExpressApp {
  private express: Application
  private serverPort = process.env.PORT || 3000

  constructor() {
    this.express = express()

    this.init()
  }

  init() {
    this.middlewares()
    this.routes()
  }

  routes() {
    new Route().init()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }

  listen() {
    this.express.listen(this.serverPort, () => console.log(`Your application is running on port ${this.serverPort}`))
  }
}