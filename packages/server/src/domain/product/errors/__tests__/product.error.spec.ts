import { ProductError } from '@/domain/product/errors/product.error'

describe('ProductError unit test', () => {
  it('should throw product error', () => {
    expect(() => {
      throw new ProductError('product error')
    }).toThrowError('product error')
  })

  it('should throw product error with 400 status when no status is set', () => {
    let errorData
    try {
      throw new ProductError('product error')
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 400
    })
  })

  it('should throw product error with other status when status is defined on constructor', () => {
    let errorData
    try {
      throw new ProductError('product error', 410)
    } catch(error) {
      errorData = error
    }

    expect(errorData).toMatchObject({
      status_code: 410
    })
  })
})