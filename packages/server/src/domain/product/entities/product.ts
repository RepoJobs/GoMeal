import { ProductImage } from '@/domain/product/value-objects/product-image'
import { ProductCategory } from './product-category'
import { InputError } from '@/domain/@shared/errors/input.error'
import { ProductError } from '@/domain/product/errors/product.error'

export class Product {
  private _id: number
  private _name: string
  private _description: string
  private _price: number
  private _categories: ProductCategory[]
  private _images: ProductImage[]
  private _availableQuantity: number
  private _createdAt: Date
  private _updatedAt: Date
  private _deletedAt: Date

  constructor(name: string, price: number, category: ProductCategory[]) {
    this._name = name
    this._price = price
    this._categories = category

    this.validate()
  }

  private validate() {
    if(!this.name)
      throw new InputError('Product name is required')

    if(this.price < 0)
      throw new InputError('Product price must be greater than 0')

    if(this._availableQuantity < 0)
      throw new InputError('Product available quantity must be greater than or equal to 0')

    if(!this.categories.length)
      throw new InputError('Product category is required')

    if(this.hasImageOrderConflict())
      throw new ProductError('Product images order must be unique')
  }

  private hasImageOrderConflict() {
    const images = this.images
    const imagesOrder = images?.map(image => image.order) || []

    const imagesOrderSet = new Set(imagesOrder)
    
    return imagesOrder.length !== imagesOrderSet.size
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get price() {
    return this._price
  }

  get categories() {
    return this._categories
  }

  get images() {
    return this._images
  }

  get availableQuantity() {
    return this._availableQuantity
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  get deletedAt() {
    return this._deletedAt
  }

  defineId(id: number) {
    if(this._id)
      throw new ProductError('you cannot redefine the product ID')

    this._id = id
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeDescription(description: string) {
    this._description = description
    this.validate()
  }

  changeCategories(category: ProductCategory[]) {
    this._categories = category
    this.validate()
  }

  changePrice(price: number) {
    this._price = price
    this.validate()
  }

  changeImages(images: ProductImage[]) {
    this._images = images
    this.validate()
  }

  changeAvailableQuantity(availableQuantity: number) {
    this._availableQuantity = availableQuantity
    this.validate()
  }

  defineCreatedAt(createdAt: Date) {
    if(this._createdAt)
      throw new ProductError('you cannot redefine the product createdAt')

    this._createdAt = createdAt
    this.validate()
  }

  defineUpdatedAt(updatedAt: Date) {
    if(!this.createdAt && updatedAt)
      throw new ProductError('you cannot define the product updatedAt without a createdAt')

    if(updatedAt && updatedAt < this._createdAt)
      throw new ProductError('you cannot define the product updatedAt with a date before createdAt')

    this._updatedAt = updatedAt
  }

  defineDeletedAt(deletedAt: Date) {
    if(this._deletedAt)
      throw new ProductError('you cannot redefine the product deletedAt')

    if(!this.createdAt && deletedAt)
      throw new ProductError('you cannot define the product deletedAt without a createdAt')

    if(deletedAt && deletedAt < this.createdAt)
      throw new ProductError('you cannot define the product deletedAt with a date before createdAt')

    this._deletedAt = deletedAt
  }
}