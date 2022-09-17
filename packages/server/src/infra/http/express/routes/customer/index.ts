import { Router } from 'express'

import { customerController } from '@/ui/express/controllers/customer'

export class CustomerRouter {
  private _router: Router

  constructor() {
    this._router = Router()

    this.init()
  }

  init() {
    this._router.get('/', (req, res) => res.json({ 'teste': 'teste' }))
    this._router.post('/register', async (req, res) => {
      return await customerController.register(req, res)
    })
  }

  get router() {
    return this._router
  }
}