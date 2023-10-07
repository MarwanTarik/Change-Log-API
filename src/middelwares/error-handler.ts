import { type NextFunction, type Request, type Response } from 'express'
import { type AppError } from '../@types/index.js'

function errorHandler (error: AppError, _req: Request, res: Response, next: NextFunction): void {
  if (error.code === 'P2025') {
    error.code = 400
    error.type = 'Database'
    res.status(error.code).json({
      massege: error.message,
      type: error.type,
      meta: error.meta
    })
  } else if (typeof error.code === 'number') {
    res.status(error.code).json({
      massege: error.message,
      type: error.type
    })
  } else {
    res.status(500).json({
      massege: error.message,
      type: 'Unexpected'
    })
  }
  next()
}

export {
  errorHandler
}
