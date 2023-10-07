import express from 'express'
import { router } from './routes.js'
import morgan from 'morgan'
import { protect } from './middelwares/auth.js'
import { signin, signup } from './handlers/user.js'
import { errorHandler } from './middelwares/error-handler.js'
import { tryCatch } from './modules/try-catch.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/signup', tryCatch(signup))
app.post('/signin', tryCatch(signin))

app.use('/api', protect, router)

app.use(errorHandler)

export {
  app
}
