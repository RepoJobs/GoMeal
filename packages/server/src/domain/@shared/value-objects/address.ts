export class Address {
  private _street: string
  private _number: string
  private _zip_code: string
  private _city: string
  private _state: string
  private _country: string

  constructor(street: string, number: string, zip_code: string, city: string, state: string, country: string) {
    this._street = street
    this._number = number
    this._zip_code = zip_code
    this._city = city
    this._state = state
    this._country = country

    this.validate()
  }

  get street() {
    return this._street
  }

  get number() {
    return this._number
  }

  get zip_code() {
    return this._zip_code
  }

  get city() {
    return this._city
  }

  get state() {
    return this._state
  }

  get country() {
    return this._country
  }

  validate() {
    if(!this.street || this.street.length == 0)
      throw Error('Street name cannot be empty')

    if(!this.number || this.number.length == 0)
      throw Error('Address number cannot be empty')

    if(!this.zip_code || this.zip_code.length == 0)
      throw Error('Zip code cannot be empty')

    if(!this.city || this.city.length == 0)
      throw Error('City cannot be empty')

    if(!this.state || this.state.length == 0)
      throw Error('State cannot be empty')

    if(!this.country || this.country.length == 0)
      throw Error('Country cannot be empty')
  }
}