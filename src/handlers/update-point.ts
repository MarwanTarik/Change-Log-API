import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../prisma_utilities/prisma-client.js'

async function getAllUpdateUpdatePoints (req: Request, res: Response, next: NextFunction): Promise<void> {
  const updatePoints = await prisma.update.findUnique({
    where: {
      id: req.params.updateid,
      product: {
        id: req.params.productid,
        userID: req.user.id
      }
    },
    select: {
      updatePoints: true
    }
  })
  res.json({ data: updatePoints })
}

async function getUpdateUpdatePointById (req: Request, res: Response, next: NextFunction): Promise<void> {
  const updatePoint = await prisma.updatePoint.findUnique({
    where: {
      id: req.params.updatepointid,
      update: {
        id: req.params.updateid,
        product: {
          id: req.params.productid,
          userID: req.user.id
        }
      }
    }
  })
  res.json({ data: updatePoint })
}

async function createUpdatePoint (req: Request, res: Response, next: NextFunction): Promise<void> {
  const createdUpdatePoint = await prisma.updatePoint.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      update: {
        connect: {
          id: req.params.updateid,
          product: {
            id: req.params.productid,
            userID: req.user.id
          }
        }
      }
    }
  })
  res.json({ data: createdUpdatePoint })
}

async function updateUpdatePoint (req: Request, res: Response, next: NextFunction): Promise<void> {
  const updatedUpdatePoint = await prisma.updatePoint.update({
    data: {
      title: req.body.title,
      description: req.body.description
    },
    where: {
      id: req.params.updatepointid,
      update: {
        id: req.params.updateid,
        product: {
          id: req.params.productid,
          userID: req.user.id
        }
      }
    }
  })
  res.json({ data: updatedUpdatePoint })
}

async function deleteUpdatePoint (req: Request, res: Response, next: NextFunction): Promise<void> {
  const deletedUpdatePoint = await prisma.updatePoint.delete({
    where: {
      id: req.params.updatepointid,
      update: {
        id: req.params.updateid,
        product: {
          id: req.params.productid,
          userID: req.user.id
        }
      }
    }
  })
  res.json({ data: deletedUpdatePoint })
}

export {
  getAllUpdateUpdatePoints,
  getUpdateUpdatePointById,
  createUpdatePoint,
  updateUpdatePoint,
  deleteUpdatePoint
}
