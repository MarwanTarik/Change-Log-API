import { type NextFunction, type Request, type Response } from 'express'
import { prisma } from '../prisma_utilities/prisma-client.js'

async function getAllProducts (req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: req.user.id
    },
    select: {
      products: true
    }
  })
  res.json({ data: user.products })
}

async function getProductById (req: Request, res: Response, next: NextFunction): Promise<void> {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.productid,
      userID: req.user.id
    }
  })
  res.json({ data: product })
}

async function createProduct (req: Request, res: Response, next: NextFunction): Promise<void> {
  const createdProduct = await prisma.product.create({
    data: {
      name: req.body.productname,
      userID: req.user.id
    }
  })
  res.json({ data: createdProduct })
}

async function updateProduct (req: Request, res: Response, next: NextFunction): Promise<void> {
  const updatedProduct = await prisma.product.update({
    where: {
      id: req.params.productid,
      userID: req.user.id
    },
    data: {
      name: req.body.productname
    }
  })
  res.json({ data: updatedProduct })
}

async function deleteProduct (req: Request, res: Response, next: NextFunction): Promise<void> {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: req.params.productid,
      userID: req.user.id
    }
  })
  res.json({ data: deletedProduct })
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
