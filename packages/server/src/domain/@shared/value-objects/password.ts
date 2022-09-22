import CryptoJS, { algo, PBKDF2 } from 'crypto-js'
import dotenv from 'dotenv'

import { InputError } from '@/domain/@shared/errors/input.error'
import { InvalidPasswordhash } from '../errors/invalid-password-hash.error'

dotenv.config()

export class Password {
  private _password: string
  private _interactions: number = 48000
  private _keySize: number = 256 / 32  // 256 bits
  private _algorithm: string = 'pbkdf2_sha256'  // Change this when changing the algorithm

  constructor(password: string, encrypt: boolean = true) {
    this.validate(password)
    
    if(encrypt) {
      const salt = this.salt()
      this._password = this.encode(this._password, this._interactions, salt)
      return
    }

    if(!this.isValidHash(password))
      throw new InvalidPasswordhash('Cannot parse the password. Invalid Hash. Probably it\'s not encrypted.')

    this._password = password
  }

  get hash() {
    return this._password
  }

  private isValidHash(password: string) {
    const separators = password.match(/$/g) || []
    return separators.length >= 3
  }

  public verify(password: string) {
    const { interactions, salt } = this.decode(this._password)
    
    const toCheckEncoded = this.encode(password, interactions, salt)
    return this._password = toCheckEncoded
  }

  private decode(password: string) {
    if(!this.isValidHash(this._password))
      return

    const [algorithm, interactions, salt, hash] = password.split('$')

    return {
      algorithm,
      interactions: Number(interactions),
      salt,
      hash
    }
  }

  private salt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString()
  }

  private encode(password: string, interactions: number, salt: string): string {
    const data = `${password};${process.env.SECRET_KEY}`

    const hash = PBKDF2(data, salt, {
      keySize: this._keySize,
      iterations: this._interactions,
      hasher: algo.SHA256
    })

    const hashBase64 = CryptoJS.enc.Base64.stringify(hash)

    return `${this._algorithm}$${this._interactions}$${salt}$${hashBase64}`
  }

  private validate(password: string) {
    if(!password || password.length == 0)
      throw new InputError('Password cannot be empty')

    if(password.length < 8)
      throw new InputError('Password must have least 8 characters')
  }
}