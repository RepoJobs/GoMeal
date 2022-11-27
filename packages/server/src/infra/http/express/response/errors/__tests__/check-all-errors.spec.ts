import { Response } from 'express'
import { checkAllErrors } from '../check-all-errors'

describe('check-all-errors unit test', () => {
  it('should generic error when has not a message', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    checkAllErrors({}, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })

  it('should generic error when it\'s not a custom error class', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    checkAllErrors({ message: 'error' }, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })

  it('should custom error when it\'s a custom error class', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    checkAllErrors({ message: 'error', status_code: 400 }, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'error' })
  })
})