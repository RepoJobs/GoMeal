import { CustomerRepositoryPrisma } from '@/infra/repository/customer/customer.repository.prisma'
import { UserRepositoryPrisma } from '@/infra/repository/user/user.repository.prisma'
import { CustomerController } from './customer.controller'

export const customerController = new CustomerController(
  new CustomerRepositoryPrisma(),
  new UserRepositoryPrisma()
)