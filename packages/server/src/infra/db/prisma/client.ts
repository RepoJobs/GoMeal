import { PrismaClient } from '@prisma/client'

export class Prisma {
  private _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  get client() {
    return this._prisma
  }

  disconnect() {
    this._prisma.$disconnect()
  }
  
  async clearAllTables() {
    const deleteUser = this._prisma.user.deleteMany()
    const deleteCustomer = this._prisma.customer.deleteMany()
    const deleteProfile = this._prisma.profile.deleteMany()
    const deleteAddress = this._prisma.userAddress.deleteMany()

    await this._prisma.$transaction([
      deleteProfile,
      deleteCustomer,
      deleteAddress,
      deleteUser,
    ])
  }
}

const instance = new Prisma()
export default instance