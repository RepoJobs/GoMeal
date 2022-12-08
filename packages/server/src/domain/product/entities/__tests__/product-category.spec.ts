import { ProductCategory } from '../product-category'

describe('ProductCategory test', () => {
  it('should create a ProductCategory', () => {
    const productCategory = new ProductCategory('category name', 'category description')
    expect(productCategory).toBeInstanceOf(ProductCategory)
    expect(productCategory.name).toBe('category name')
    expect(productCategory.description).toBe('category description')
  })

  it('should throw an error if name is not provided', () => {
    expect(() => new ProductCategory('')).toThrowError('Category name is required')
  })

  it('should throw an error if description is set as null', () => {
    expect(() => new ProductCategory('category name', null)).toThrowError('Category description cannot be null')
  })

  it('should change name', () => {
    const productCategory = new ProductCategory('category name', 'category description')
    productCategory.changeName('new category name')
    expect(productCategory.name).toBe('new category name')
  })

  it('should change description', () => {
    const productCategory = new ProductCategory('category name', 'category description')
    productCategory.changeDescription('new category description')
    expect(productCategory.description).toBe('new category description')
  })

  it('should change id', () => {
    const productCategory = new ProductCategory('category name', 'category description')
    productCategory.defineId(1)
    expect(productCategory.id).toBe(1)
  })

  it('should throw an error if id is already defined', () => {
    const productCategory = new ProductCategory('category name', 'category description')
    productCategory.defineId(1)
    expect(() => productCategory.defineId(2)).toThrowError('you cannot redefine the category ID')
  })
})