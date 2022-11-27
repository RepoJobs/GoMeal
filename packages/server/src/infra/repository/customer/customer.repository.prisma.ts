import { Customer } from '@/domain/customer/entities/customer'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'
import { Prisma } from '@/infra/db/prisma/client'

export class CustomerRepositoryPrisma implements ICustomerRepository {
  private prisma: Prisma

  constructor() {
    this.prisma = new Prisma()
  }

  async create(customer: Customer): Promise<void> {
    await this.prisma.client.customer.create({
      data: {
        userId: customer.user.id
      }
    })
  }
}