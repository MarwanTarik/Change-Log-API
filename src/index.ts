import * as dotenv from 'dotenv'
import { app } from './server.js'
import config from './config/index.js'
dotenv.config()

app.listen(config.port, function startServer () {
  console.log(`server ON http://localhost:${config.port}`)
})
