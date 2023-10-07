import { type User } from '@prisma/client'
import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from '../config/index.js'
import bcrypt from 'bcrypt'
import { AppError } from '../@types/index.js'

function creatJWT (user: User): string | undefined {
  try {
    const secret = config.JWT_SECRET
    if (secret !== undefined) {
      const token = jwt.sign({
        id: user.id,
        username: user.username
      }, secret)
      return token
    }
  } catch (err) {
    return undefined
  }
}

function protect (req: Request, res: Response, next: NextFunction): void {
  const bearer = req.headers.authorization
  if (bearer === undefined) {
    next(new AppError('Invalid Bearer', 401, 'Authorization'))
    return
  }
  const [,token] = bearer.split(' ')
  if (token === undefined) {
    next(new AppError('Invalid JWT_Token', 401, 'Authorization'))
    return
  }
  try {
    const secret = config.JWT_SECRET
    if (secret !== undefined) {
      const paylod = jwt.verify(token, secret) as JwtPayload
      req.user = paylod
    }
    next()
  } catch (err) {
    next(new AppError(err.massege, 401, err.type))
  }
}

async function comparePassword (password: string, hash: string): Promise<boolean> {
  const isValisPassword = await bcrypt.compare(password, hash)
  return isValisPassword
}

async function hashPassword (password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 5)
  return hashedPassword
}

export {
  creatJWT,
  protect,
  comparePassword,
  hashPassword
}
