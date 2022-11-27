import { Address } from '@/domain/@shared/value-objects/address'
import { User } from '@/domain/user/entities/user'

export interface IUserRepository {
  create(user: User): Promise<number>,
  addAddress(userID: number, address: Address): Promise<void>
}