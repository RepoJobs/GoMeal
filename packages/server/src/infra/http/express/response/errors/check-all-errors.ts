import { Response } from 'express'

import { ResponseCommon, ResponseGenericError } from './response-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkAllErrors = (error: any, res: Response) => {
  if(!error.message)
    return ResponseGenericError(res)

  return ResponseCommon(error, res)
}
