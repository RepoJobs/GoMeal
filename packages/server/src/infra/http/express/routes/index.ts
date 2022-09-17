import { Router } from 'express'

import { CustomerRouter } from './customer'

export class Route {
  private _router: Router = Router()
  
  constructor() {
    this.init()
  }

  init() {
    this._router.use('/customer', new CustomerRouter().router)
  }

  get router() {
    return this._router
  }
}