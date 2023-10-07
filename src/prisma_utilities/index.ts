import { prisma } from './prisma-client.js'

async function resetDB (): Promise<void> {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.product.deleteMany(),
    prisma.update.deleteMany(),
    prisma.updatePoint.deleteMany()
  ])
}

export {
  resetDB
}
