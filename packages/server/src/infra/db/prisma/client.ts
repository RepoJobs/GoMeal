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
    const deleteCity = this._prisma.city.deleteMany()
    const deleteState = this._prisma.state.deleteMany()
    const deleteCountry = this._prisma.country.deleteMany()

    await this._prisma.$transaction([
      deleteProfile,
      deleteCustomer,
      deleteAddress,
      deleteUser,
      deleteCity,
      deleteState,
      deleteCountry
    ])
  }
}

const instance = new Prisma()
export default instance