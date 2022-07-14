import { Request } from 'express'

export interface IService {
  execute(request: Request): any
}