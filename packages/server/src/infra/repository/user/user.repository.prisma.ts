import { InvalidAddress } from '@/domain/@shared/errors/invalid-address.error'
import { Address } from '@/domain/@shared/value-objects/address'
import { User } from '@/domain/user/entities/user'
import { IUserRepository } from '@/domain/user/repository/user.repository.interface'
import { Prisma } from '@/infra/db/prisma/client'

export class UserRepositoryPrisma implements IUserRepository {
  private prisma: Prisma

  constructor() {
    this.prisma = new Prisma()
  }

  async create(user: User): Promise<number> {
    const userInstance = await this.prisma.client.user.create({
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

    let countryInstance, stateInstance, cityInstance

    try {
      countryInstance = await this.prisma.client.country.findFirstOrThrow({
        where: {
          name: country
        }
      })
  
      stateInstance = await this.prisma.client.state.findFirstOrThrow({
        where: {
          name: state,
          countryId: countryInstance.id
        }
      })
  
      cityInstance = await this.prisma.client.city.findFirstOrThrow({
        where: {
          name: city,
          stateId: stateInstance.id
        }
      })
    } catch(err) {
      throw new InvalidAddress('Invalid Address')
    }


    await this.prisma.client.userAddress.create({
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