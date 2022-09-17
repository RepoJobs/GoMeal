import { CustomerRegisterService } from '@/application/customer/services/customer.register.service'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'
import { checkAllErrors } from '@/infra/http/express/response/errors/check-all-errors'
import { Request, Response } from 'express'

export class CustomerController {
  private _customerRepository: ICustomerRepository

  constructor(customerRepository: ICustomerRepository) {
    this._customerRepository = customerRepository
  }

  async register(req: Request, res: Response) {
    try {
      const response = await new CustomerRegisterService(this._customerRepository).execute(req.body)
      
      return res.status(201).json(response)
    } catch(err) {
      return checkAllErrors(err, res)
    }
  }
}