import { prodConfig } from './prod.js'
import { testingConfig } from './testing.js'
import { localConfig } from './local.js'
import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'
const stage = process.env.STAGE ?? 'local'

let envConfig: object
if (stage === 'production') {
  envConfig = prodConfig
} else if (stage === 'testing') {
  envConfig = testingConfig
} else {
  envConfig = localConfig
}
console.log(stage)
const defaultConfig = {
  stage,
  DB_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  port: process.env.PORT,
  logging: false
}

export default merge(defaultConfig, envConfig)
