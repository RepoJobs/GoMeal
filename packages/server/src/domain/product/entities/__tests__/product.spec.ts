import { ProductImage } from '@/domain/product/value-objects/product-image'
import { Product } from '../product'
import { ProductCategory } from '../product-category'

describe('Product test', () => {
  it('should create a Product', () => {
    const category = new ProductCategory('category name', 'category description')

    const date = new Date()

    const product = new Product('product name', 10, [category])
    product.changeDescription('product description')
    product.changeAvailableQuantity(10)
    product.changeImages([new ProductImage('/static/images/photo.png', 1)])
    product.defineCreatedAt(date)
    product.defineUpdatedAt(date)

    expect(product).toBeInstanceOf(Product)
    expect(product.name).toBe('product name')
    expect(product.description).toBe('product description')
    expect(product.price).toBe(10)
    expect(product.categories.length).toBe(1)
    expect(product.availableQuantity).toBe(10)
    expect(product.images.length).toBe(1)
    expect(product.createdAt).toBe(date)
    expect(product.updatedAt).toBe(date)
  })

  it('should throw an error if name is not provided', () => {
    const category = new ProductCategory('category name', 'category description')

    expect(() => {
      new Product('', 10, [category])
    }).toThrowError('Product name is required')
  })

  it('should throw an error if price is negative', () => {
    const category = new ProductCategory('category name', 'category description')

    expect(() => {
      new Product('product name', -1, [category])
    }).toThrowError('Product price must be greater than 0')
  })

  it('should throw an error if category is not provided', () => {
    expect(() => {
      new Product('product name', 10, [])
    }).toThrowError('Product category is required')
  })

  it('should change name', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.changeName('new product name')
    expect(product.name).toBe('new product name')
  })

  it('should throw error if try to change name with a invalid value', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.changeName('')
    }).toThrowError('Product name is required')
  })

  it('should change description', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.changeDescription('new product description')
    expect(product.description).toBe('new product description')
  })

  it('should change price', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.changePrice(20)
    expect(product.price).toBe(20)
  })

  it('should throw an error if try to change price with a invalid value', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.changePrice(-1)
    }).toThrowError('Product price must be greater than 0')
  })

  it('should change categories', () => {
    const category = new ProductCategory('category name', 'category description')
    const newCategory = new ProductCategory('new category name', 'new category description')

    const product = new Product('product name', 10, [category])
    product.changeCategories([newCategory])
    expect(product.categories.length).toBe(1)
    expect(product.categories[0].name).toBe('new category name')
  })

  it('should change id', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineId(1)
    expect(product.id).toBe(1)
  })

  it('should throw an error if id is already defined', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineId(1)
    expect(() => product.defineId(2)).toThrowError('you cannot redefine the product ID')
  })

  it('should change images', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.changeImages([
      new ProductImage('/image.png', 1),
      new ProductImage('/image2.png', 2),
    ])
    expect(product.images.length).toBe(2)
    expect(product.images[0].url).toBe('/image.png')
    expect(product.images[1].url).toBe('/image2.png')
  })

  it('should throw error when try to change images with invalid url path', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.changeImages([
        new ProductImage('invalid-path', 1),
        new ProductImage('/image2.png', 2)
      ])
    }).toThrowError('Invalid URL path: invalid-path')
  })

  it('should throw error when try to change images with invalid file extensions', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.changeImages([
        new ProductImage('/image2.pdf', 1),
        new ProductImage('/image.png', 2)
      ])
    }).toThrowError('Invalid URL path: /image2.pdf')
  })

  it('should throw error when try to change images with same order value', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.changeImages([
        new ProductImage('/image.png', 1),
        new ProductImage('/image2.png', 1),
      ])
    }).toThrowError('Product images order must be unique')
  })

  it('should throw error when try to change images with invalid order value', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.changeImages([
        new ProductImage('/image.png', 0),
        new ProductImage('/image2.png', 1),
      ])
    }).toThrowError('Product image order must be greater than 0')
  })

  it('should change image to empty list', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.changeImages([])
    expect(product.images.length).toBe(0)
  })

  it('should change available quantity', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.changeAvailableQuantity(10)
    expect(product.availableQuantity).toBe(10)
  })

  it('should throw error when try to change available quantity with negative value', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])

    expect(() => {
      product.changeAvailableQuantity(-1)
    }).toThrowError('Product available quantity must be greater than or equal to 0')
  })

  it('should define createdAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2020-01-01'))
    expect(product.createdAt).toEqual(new Date('2020-01-01'))
  })

  it('should throw error when try to redefine createdAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2020-01-01'))

    expect(() => {
      product.defineCreatedAt(new Date('2020-01-02'))
    }).toThrowError('you cannot redefine the product createdAt')
  })

  it('should define updatedAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2019-01-01'))
    product.defineUpdatedAt(new Date('2020-01-01'))
    expect(product.updatedAt).toEqual(new Date('2020-01-01'))
  })

  it('should define deletedAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2019-01-01'))
    product.defineDeletedAt(new Date('2020-01-01'))
    expect(product.deletedAt).toEqual(new Date('2020-01-01'))
  })

  it('should throw error when try to redefine deletedAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2019-01-01'))
    product.defineDeletedAt(new Date('2020-01-01'))

    expect(() => {
      product.defineDeletedAt(new Date('2020-01-02'))
    }).toThrowError('you cannot redefine the product deletedAt')
  })

  it('should not define updatedAt date before createdAt date', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2020-01-01'))

    expect(() => {
      product.defineUpdatedAt(new Date('2019-01-01'))
    }).toThrowError('you cannot define the product updatedAt with a date before createdAt')
  })

  it('should not define deletedAt date before createdAt date', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineCreatedAt(new Date('2020-01-01'))

    expect(() => {
      product.defineDeletedAt(new Date('2019-01-01'))
    }).toThrowError('you cannot define the product deletedAt with a date before createdAt')
  })

  it('should not define updatedAt date before define createdAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.defineUpdatedAt(new Date('2020-01-01'))
    }).toThrowError('you cannot define the product updatedAt without a createdAt')
  })

  it('should define updatedAt to null without createdAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineUpdatedAt(null)
    expect(product.updatedAt).toBeNull()
  })

  it('should not define deletedAt date before define createdAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    expect(() => {
      product.defineDeletedAt(new Date('2020-01-01'))
    }).toThrowError('you cannot define the product deletedAt without a createdAt')
  })

  it('should define deletedAt to null without createdAt', () => {
    const category = new ProductCategory('category name', 'category description')

    const product = new Product('product name', 10, [category])
    product.defineDeletedAt(null)
    expect(product.deletedAt).toBeNull()
  })
})