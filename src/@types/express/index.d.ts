import { type JwtPayload } from 'jsonwebtoken'

declare global{
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
  interface Error {
    type?: string
  }
}
