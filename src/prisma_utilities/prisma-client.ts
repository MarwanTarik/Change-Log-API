import { PrismaClient } from '@prisma/client'
import { prismaConfig } from './prisma-config.js'

const prisma = new PrismaClient(prismaConfig)

export {
  prisma
}
