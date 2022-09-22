import { CustomerRegisterService } from '@/application/customer/services/customer.register.service'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'
import { IUserRepository } from '@/domain/user/repository/user.repository.interface'
import { checkAllErrors } from '@/infra/http/express/response/errors/check-all-errors'
import { Request, Response } from 'express'

export class CustomerController {
  private _customerRepository: ICustomerRepository
  private _userRepository: IUserRepository

  constructor(customerRepository: ICustomerRepository, userRepository: IUserRepository) {
    this._customerRepository = customerRepository
    this._userRepository = userRepository
  }

  async register(req: Request, res: Response) {
    try {
      const response = await new CustomerRegisterService(
        this._customerRepository, 
        this._userRepository
      ).execute(req.body)
      
      return res.status(201).json(response)
    } catch(err) {
      console.log(err)
      return checkAllErrors(err, res)
    }
  }
}