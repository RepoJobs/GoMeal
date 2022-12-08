import { FileURLPath } from '@/domain/@shared/value-objects/file-url-path'

export class ProductImage {
  private _url: FileURLPath
  private _order: number
  private _allowedExtensions = ['png', 'jpg', 'jpeg']

  constructor(url: string, order: number) {
    this.validate(url, order)

    this._url = new FileURLPath(url, this._allowedExtensions)
    this._order = order
  }

  get url() {
    return this._url.value
  }

  get order() {
    return this._order
  }

  private validate(url: string, order: number) {
    if(!url)
      throw new Error('Product image url is required')

    if(order < 1)
      throw new Error('Product image order must be greater than 0')
  }
}