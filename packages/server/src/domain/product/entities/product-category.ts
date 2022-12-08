import { InputError } from '@/domain/@shared/errors/input.error'
import { ProductError } from '../errors/product.error'

export class ProductCategory {
  private _id: number
  private _name: string
  private _description: string

  constructor(name: string, description = '') {
    this._name = name
    this._description = description

    this.validate()
  }

  validate() {
    if (!this.name) 
      throw new InputError('Category name is required')

    if (this.description === null)
      throw new ProductError('Category description cannot be null')
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get id() {
    return this._id
  }
  
  defineId(id: number) {
    if(this._id)
      throw new ProductError('you cannot redefine the category ID')

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
}