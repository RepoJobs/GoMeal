import { PasswordManager } from '@/infra/auth/password/password.manager'

describe('isValidHash unit test', () => {
  it('should return true when set a hash valid', () => {
    const passwordManager = new PasswordManager()
    const salt = passwordManager.salt()
    const hash = passwordManager.encode('12345678', salt)

    expect(passwordManager.isValidHash(hash)).toBe(true)
  })

  it('should return false when set a invalid hash', () => {
    const passwordManager = new PasswordManager()
    const hash = '123'

    expect(passwordManager.isValidHash(hash)).toBe(false)
  })

  it('should return false when set a null hash', () => {
    const passwordManager = new PasswordManager()
    const hash: null = null

    expect(passwordManager.isValidHash(hash)).toBe(false)
  })
})

describe('verify unit test', () => {
  it('should return true when password hash and to compare password are equals', () => {
    const passwordManager = new PasswordManager()
  
    const salt = passwordManager.salt()
    const passwordHash = passwordManager.encode('12345678', salt)

    expect(passwordManager.verify(passwordHash, '12345678')).toBe(true)
  })

  it('should return false when password hash and to compare password are different', () => {
    const passwordManager = new PasswordManager()
  
    const salt = passwordManager.salt()
    const passwordHash = passwordManager.encode('12345678', salt)

    expect(passwordManager.verify(passwordHash, 'something-wrong')).toBe(false)
  })

  it('should return false when password to compare is null', () => {
    const passwordManager = new PasswordManager()
  
    const salt = passwordManager.salt()
    const passwordHash = passwordManager.encode('12345678', salt)

    expect(passwordManager.verify(passwordHash, null)).toBe(false)
  })
})

describe('decode unit test', () => {
  it('should return decoded password', () => {
    const passwordManager = new PasswordManager()
    const salt = passwordManager.salt()
    const hash = passwordManager.encode('12345678', salt)

    const decodedPassword = passwordManager.decode(hash)
    expect(decodedPassword).toMatchObject({
      algorithm: passwordManager.algorithm,
      interactions: passwordManager.interactions,
      salt,
      hash: hash.split('$')[3]
    })
  })

  it('should return null when invalid hash is set', () => {
    const passwordManager = new PasswordManager()
    const hash = '123'

    const decodedPassword = passwordManager.decode(hash)
    expect(decodedPassword).toBeNull()
  })

  it('should return null when null hash is set', () => {
    const passwordManager = new PasswordManager()
    
    const decodedPassword = passwordManager.decode(null)
    expect(decodedPassword).toBeNull()
  })
})

describe('salt unit test', () => {
  it('should return a salt', () => {
    const passwordManager = new PasswordManager()
    const salt = passwordManager.salt()

    expect(salt).toBeDefined()
  })
})

describe('encode unit test', () => {
  it('should return a hash', () => {
    const passwordManager = new PasswordManager()
    const salt = passwordManager.salt()
    const hash = passwordManager.encode('12345678', salt)

    expect(hash).toBeDefined()
    expect(passwordManager.isValidHash(hash)).toBe(true)
  })

  it('should not return a hash when password is null', () => {
    const passwordManager = new PasswordManager()
    const salt = passwordManager.salt()
    const hash = passwordManager.encode(null, salt)

    expect(hash).toBeNull()
  })

  it('should not return a hash when salt is null', () => {
    const passwordManager = new PasswordManager()
    const salt: null = null
    const hash = passwordManager.encode('12345678', salt)

    expect(hash).toBeNull()
  })

  it('should generate hash with interaction different from default when it is set', () => {
    const passwordManager = new PasswordManager()
    const salt = passwordManager.salt()
    const hash = passwordManager.encode('12345678', salt, 1000)

    const decodedPassword = passwordManager.decode(hash)
    expect(hash).toBeDefined()
    expect(decodedPassword).toMatchObject({
      algorithm: passwordManager.algorithm,
      interactions: 1000,
      salt,
      hash: hash.split('$')[3]
    })
  })
})

describe('get attributes unit test', () => {
  it('should return interactions', () => {
    const passwordManager = new PasswordManager()
    expect(passwordManager.interactions).toBe(48000)
  })

  it('should return algorithm', () => {
    const passwordManager = new PasswordManager()
    expect(passwordManager.algorithm).toBe('pbkdf2_sha256')
  })

  it('should return keySize', () => {
    const passwordManager = new PasswordManager()
    expect(passwordManager.keySize).toBe(256 / 32)
  })
})