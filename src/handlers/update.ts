import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../prisma_utilities/prisma-client.js'

async function getAllProductUpdates (req: Request, res: Response, next: NextFunction): Promise<void> {
  const updates = await prisma.product.findUnique({
    where: {
      id: req.params.productid,
      userID: req.user.id
    },
    select: {
      updates: true
    }
  })
  res.json({ data: updates })
}

async function getProductUpdateById (req: Request, res: Response, next: NextFunction): Promise<void> {
  const update = await prisma.product.findUnique({
    where: {
      id: req.params.productid,
      userID: req.user.id
    },
    select: {
      updates: {
        where: {
          id: req.params.updateid
        }
      }
    }
  })
  res.json({ data: update })
}

async function createProductUpdate (req: Request, res: Response, next: NextFunction): Promise<void> {
  const createdUpdate = await prisma.update.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      asset: req.body.asset,
      version: req.body.version,
      status: req.body.status,
      product: {
        connect: {
          id: req.params.productid,
          userID: req.user.id
        }
      }
    }
  })
  res.json({ data: createdUpdate })
}

async function updateProductUpdate (req: Request, res: Response, next: NextFunction): Promise<void> {
  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.updateid
    },
    data: {
      title: req.body.title,
      description: req.body.description,
      asset: req.body.asset,
      version: req.body.version,
      status: req.body.status,
      product: {
        connect: {
          id: req.params.productid,
          userID: req.user.id
        }
      }
    }
  })
  res.json({ data: updatedUpdate })
}

async function deleteProductUpdate (req: Request, res: Response, next: NextFunction): Promise<void> {
  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.updateid,
      product: {
        id: req.params.productid,
        userID: req.user.id
      }
    }
  })
  res.json({ message: deletedUpdate })
}

export {
  getProductUpdateById,
  getAllProductUpdates,
  createProductUpdate,
  updateProductUpdate,
  deleteProductUpdate
}
