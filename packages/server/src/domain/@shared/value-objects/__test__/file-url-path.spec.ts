import { FileURLPath } from '../file-url-path'

describe('FileURLPath value object test', () => {
  it('should create a FileURLPath', () => {
    const fileURLPath = new FileURLPath('/images/image.png', ['png', 'jpg', 'jpeg'])
    expect(fileURLPath).toBeInstanceOf(FileURLPath)
    expect(fileURLPath.value).toBe('/images/image.png')
    expect(fileURLPath.allowedExtensions).toEqual(['png', 'jpg', 'jpeg'])
  })

  it('should throw an error if url is not provided', () => {
    expect(() => new FileURLPath('', ['png', 'jpg', 'jpeg']))
      .toThrowError('URL is required')
  })

  it('should throw an error if allowed extensions is not provided', () => {
    expect(() => new FileURLPath('/images/image.png', []))
      .toThrowError('Allowed extensions is required')

    expect(() => new FileURLPath('/images/image.png'))
      .toThrowError('Allowed extensions is required')
  })

  it('should throw an error if url is not a valid url path', () => {
    expect(() => new FileURLPath('invalid-url', ['png', 'jpg', 'jpeg']))
      .toThrowError('Invalid URL path: invalid-url')
  })

  it('should throw an error if path has a invalid image extension', () => {
    expect(() => new FileURLPath('/images/image.pdf', ['png', 'jpg', 'jpeg']))
      .toThrowError('Invalid URL path: /images/image.pdf')
  })

  it('should throw an error if path was provided with a domain', () => {
    expect(() => {
      new FileURLPath('https://myapp.com/api/images/file.png', ['png'])
    }).toThrowError('Invalid URL path: https://myapp.com/api/images/file.png')
  })
})