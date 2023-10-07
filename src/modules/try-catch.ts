import { type Request, type Response, type NextFunction } from 'express'

type ControllerFunction = (req: Request,
  res: Response,
  next: NextFunction) => Promise<void>

function tryCatch (controller: ControllerFunction): ControllerFunction {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export {
  tryCatch
}
