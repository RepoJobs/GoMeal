import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResponseCommon = (error: any, res: Response) =>
  res.status(error?.status_code || 400).json({
    error: error?.message
  })

export const ResponseGenericError = (res: Response) => 
  res.status(500).json({ message: 'Internal server error' })