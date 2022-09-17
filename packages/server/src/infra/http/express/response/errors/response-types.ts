import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResponseCommon = (error: any, res: Response) => {
  const data = error?.response?.data

  return res.status(data.status || 400).json(data?.message || {})
}

export const ResponseGenericError = (res: Response) => 
  res.status(500).json({ message: 'Internal server error' })