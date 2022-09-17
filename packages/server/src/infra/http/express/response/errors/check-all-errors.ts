import { Response } from 'express'

import { InputError } from '@/domain/@shared/errors/input.error'
import { ResponseCommon, ResponseGenericError } from './response-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkAllErrors = (error: any, res: Response) => {
  if(!error.message)
    return ResponseGenericError(res)

  if(error instanceof InputError)
    return ResponseCommon(error, res)

  return ResponseGenericError(res)
}
