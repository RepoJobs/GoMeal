import { PrismaClient } from '@prisma/client'

import { Customer } from '@/domain/customer/entities/customer'
import { ICustomerRepository } from '@/domain/customer/repository/customer.repository.interface'

export class CustomerRepositoryPrisma implements ICustomerRepository {
  private prisma: PrismaClient
  
  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(customer: Customer): Promise<void> {
    await this.prisma.customer.create({
      data: {
        userId: customer.user.id
      }
    })
  }
}