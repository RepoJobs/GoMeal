import { Router } from 'express'

import { customerController } from '@/ui/express/controllers/customer'

export class CustomerRouter {
  private _router: Router

  constructor() {
    this.init()

    this._router = Router()
  }

  init() {
    this._router.post('/customer/register', async (req, res) => {
      return customerController.register(req, res)
    })
  }
}