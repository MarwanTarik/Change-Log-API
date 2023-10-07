import config from '../config/index.js'

const prismaConfig = {
  datasources: {
    db: {
      url: config.DB_URL
    }
  }
}

export {
  prismaConfig
}
