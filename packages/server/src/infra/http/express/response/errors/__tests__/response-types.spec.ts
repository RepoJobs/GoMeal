import { Response } from 'express'
import { ResponseCommon, ResponseGenericError } from '../response-types'

describe('response types unit test', () => {
  it('should generic error', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    ResponseGenericError(res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })

  it('should common error', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    ResponseCommon({ message: 'error', status_code: 400 }, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'error' })
  })

  it('should common error without message', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    ResponseCommon({ status_code: 400 }, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })

  it('should generic error when try to call common error without error value', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response

    ResponseCommon(undefined, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' })
  })
})