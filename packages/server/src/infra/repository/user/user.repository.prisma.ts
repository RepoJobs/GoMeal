import { Address } from '@/domain/@shared/value-objects/address'
import { User } from '@/domain/user/entities/user'
import { IUserRepository } from '@/domain/user/repository/user.repository.interface'
import { PrismaClient } from '@prisma/client'

export class UserRepositoryPrisma implements IUserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create(user: User): Promise<number> {
    const userInstance = await this.prisma.user.create({
      data: {
        first_name: user.name.firstName,
        last_name: user.name.lastName,
        email: user.email.email,
        password: user.passwordHash,
        profile: {
          create: {}
        }
      }
    })

    return userInstance.id
  }

  async addAddress(userID: number, address: Address): Promise<void> {
    if(!address)
      return

    const { street, number, zip_code, city, state, country } = address

    const countryInstance = await this.prisma.country.findFirstOrThrow({
      where: {
        name: country
      }
    })

    const stateInstance = await this.prisma.state.findFirstOrThrow({
      where: {
        name: state,
        countryId: countryInstance.id
      }
    })

    const cityInstance = await this.prisma.city.findFirstOrThrow({
      where: {
        name: city,
        stateId: stateInstance.id
      }
    })

    await this.prisma.userAddress.create({
      data: {
        street: street,
        number: number,
        zip_code: zip_code,
        countryId: countryInstance.id,
        stateId: stateInstance.id,
        cityId: cityInstance.id,
        userId: userID
      }
    })
  }

}