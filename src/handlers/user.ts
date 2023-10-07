import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../prisma_utilities/prisma-client.js'
import { comparePassword, creatJWT, hashPassword } from '../middelwares/auth.js'
import { AppError } from '../@types/index.js'

async function signup (req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password)
    }
  })
  const token = creatJWT(user)
  if (token === undefined) {
    next(new AppError('Invalid_JWT_SECRET', 401, 'Authorization'))
  }
  res.json({ token })
}

async function signin (req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })
  if (user !== null) {
    const isValid = await comparePassword(req.body.password, user.password)
    if (!isValid) {
      res.status(401)
      res.json({ message: 'invalid password' })
      return
    }
    const token = creatJWT(user)
    if (token === undefined) {
      next(new AppError('Invalid_JWT_SECRET', 401, 'Authorization'))
    }
    res.json({ token })
  } else {
    next(new AppError('Username not found', 401, 'Authorization'))
  }
}

export {
  signin,
  signup
}
