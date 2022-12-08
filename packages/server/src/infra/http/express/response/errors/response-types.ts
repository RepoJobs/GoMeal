import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResponseCommon = (error: any, res: Response) => {
  if(!error)
    return ResponseGenericError(res)
  
  if(!error.status_code || !error.message)
    return ResponseGenericError(res)

  res.status(error.status_code).json({
    error: error.message
  })
}

export const ResponseGenericError = (res: Response) => 
  res.status(500).json({ message: 'Internal server error' })