import { type NextFunction, type Request, type Response } from 'express'
import { body, checkExact, validationResult } from 'express-validator'
import { AppError } from '../@types/index.js'

const productValidator = {
  validateCreation: [
    checkExact([
      body('productname').isString().isLength({ min: 1, max: 300 })
    ], { message: 'inappropriatne request paylod' }),
    handleInputErrror
  ],
  validateUpdate: [
    checkExact([
      body('productname').isString().isLength({ min: 1, max: 300 })
    ], { message: 'inappropriate request paylod' }),
    handleInputErrror
  ]
}

const updateValidator = {
  validateCreation: [
    checkExact([
      body('title').exists().isString().isLength({ min: 1 }),
      body('description').exists().isString().isLength({ min: 1 }),
      body('asset').optional().isString(),
      body('version').optional().isString(),
      body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'])
    ], { message: 'inappropriate request paylod' }),
    handleInputErrror
  ],
  validateUpdate: [
    checkExact([
      body('title').optional().isString().isLength({ min: 1 }),
      body('description').optional().isString().isLength({ min: 1 }),
      body('asset').optional().isString(),
      body('version').optional().isString(),
      body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'])
    ], { message: 'inappropriate request paylod' }),
    handleInputErrror
  ]
}

const updatePointValidator = {
  validateCreation: [
    checkExact([
      body('title').exists().isString().isLength({ min: 1 }),
      body('description').exists().isString().isLength({ min: 1 })
    ], { message: 'inappropriate request paylod' }),
    handleInputErrror
  ],
  validateUpdate: [
    checkExact([
      body('title').exists().isString().isLength({ min: 1 }),
      body('description').exists().isString().isLength({ min: 1 })
    ], { message: 'inappropriate request paylod' }),
    handleInputErrror
  ]
}

function handleInputErrror (req: Request, res: Response, next: NextFunction): void {
  const validation = validationResult(req)
  if (!validation.isEmpty()) {
    const errors = validation.array()
    const errorMassage = errors[0].msg
    const errorType = errors[0].type
    const error = new AppError(errorMassage, 400, errorType)
    next(error)
  } else {
    next()
  }
}

export {
  productValidator,
  updateValidator,
  updatePointValidator
}
