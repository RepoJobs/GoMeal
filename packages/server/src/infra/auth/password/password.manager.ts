import CryptoJS, { algo, PBKDF2 } from 'crypto-js'

export class PasswordManager {
  private _interactions: number = 48000
  private _keySize: number = 256 / 32  // 256 bits
  private _algorithm: string = 'pbkdf2_sha256'  // Change this when changing the algorithm

  public isValidHash(password: string) {
    const separators = password?.match(/\$/g) || []
    return separators.length >= 3
  }

  public verify(currentPasswordHash: string, toComparePassword: string) {
    const { interactions, salt } = this.decode(currentPasswordHash)
    
    const toCheckEncoded = this.encode(toComparePassword, salt, interactions)
    return currentPasswordHash == toCheckEncoded
  }

  public decode(password: string) {
    if(!password)
      return null

    if(!this.isValidHash(password))
      return null

    const [algorithm, interactions, salt, hash] = password.split('$')

    return {
      algorithm,
      interactions: Number(interactions),
      salt,
      hash
    }
  }

  public salt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString()
  }

  public encode(password: string, salt: string, interactions: number = this._interactions): string {
    if(!password || !salt)
      return null

    const data = `${password};${process.env.SECRET_KEY}`

    const hash = PBKDF2(data, salt, {
      keySize: this._keySize,
      iterations: interactions,
      hasher: algo.SHA256
    })

    const hashBase64 = CryptoJS.enc.Base64.stringify(hash)

    return `${this._algorithm}$${interactions}$${salt}$${hashBase64}`
  }

  get interactions() {
    return this._interactions
  }

  get keySize() {
    return this._keySize
  }

  get algorithm() {
    return this._algorithm
  }
}