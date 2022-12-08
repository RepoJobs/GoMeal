import { InvalidURL } from '@/domain/@shared/errors/invalid-url.error'

export class FileURLPath {
  private _value: string
  private _allowedExtensions: string[] = []

  constructor(value: string, allowedExtensions: string[] = []) {
    this._value = value
    this._allowedExtensions = allowedExtensions

    this.validate()
  }

  get value() {
    return this._value
  }

  get allowedExtensions() {
    return this._allowedExtensions
  }

  private isValidPath(path: string) {
    const extensionsRegex = this.allowedExtensions.join('|')
    const regex = new RegExp(`/([-a-zA-Z0-9()@:%_+.~#?&/=]*).(${extensionsRegex})`)
    const match = path.match(regex)

    return match && match[0] === path
  }

  private validate() {
    if (!this.value) 
      throw new InvalidURL('URL is required')

    if (!this.allowedExtensions.length)
      throw new InvalidURL('Allowed extensions is required')

    if (!this.isValidPath(this.value))
      throw new InvalidURL(`Invalid URL path: ${this.value}`)
  }
}