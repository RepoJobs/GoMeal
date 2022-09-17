import { Customer } from '@/domain/customer/entities/customer'

export interface ICustomerRepository {
  register(customer: Customer): Promise<void>
}