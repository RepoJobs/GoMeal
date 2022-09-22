import { Customer } from '@/domain/customer/entities/customer'

export interface ICustomerRepository {
  create(customer: Customer): Promise<void>
}