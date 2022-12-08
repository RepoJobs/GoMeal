import { ProductImage } from '../product-image'

describe('ProductImage value object test', () => {
  it('should create a ProductImage', () => {
    const productImage = new ProductImage('/images/image.png', 1)
    expect(productImage).toBeInstanceOf(ProductImage)
    expect(productImage.url).toBe('/images/image.png')
    expect(productImage.order).toBe(1)
  })
  
  it('should throw an error if url is not a valid url path', () => {
    expect(() => new ProductImage('invalid-url', 1))
      .toThrowError('Invalid URL path: invalid-url')
  })

  it('should throw an error if path has a invalid image extension', () => {
    expect(() => new ProductImage('/images/image.pdf', 1))
      .toThrowError('Invalid URL path: /images/image.pdf')
  })

  it('should throw an error if url is not provided', () => {
    expect(() => new ProductImage('', 1))
      .toThrowError('Product image url is required')
  })

  it('should throw an error if order is zero', () => {
    expect(() => new ProductImage('/images/image.png', 0))
      .toThrowError('Product image order must be greater than 0')
  })

  it('should throw an error if order is negative', () => {
    expect(() => new ProductImage('/images/image.png', -1))
      .toThrowError('Product image order must be greater than 0')
  })
})