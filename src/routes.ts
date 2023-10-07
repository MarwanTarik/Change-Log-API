import { Router } from 'express'
import { productValidator, updatePointValidator, updateValidator } from './middelwares/request-validator.js'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from './handlers/product.js'
import { createProductUpdate, deleteProductUpdate, getAllProductUpdates, getProductUpdateById, updateProductUpdate } from './handlers/update.js'
import { getAllUpdateUpdatePoints, getUpdateUpdatePointById, createUpdatePoint, deleteUpdatePoint, updateUpdatePoint } from './handlers/update-point.js'
import { tryCatch } from './modules/try-catch.js'

const router = Router()

/**
 * Product
 */
router.get('/product',
  tryCatch(getAllProducts))

router.get('/product/:productid',
  tryCatch(getProductById))

router.post('/product',
  productValidator.validateCreation,
  tryCatch(createProduct))

router.put('/product/:productid',
  productValidator.validateUpdate,
  tryCatch(updateProduct))

router.delete('/product/:productid',
  tryCatch(deleteProduct))

/**
 * Update
 */
router.get('/update/:productid',
  tryCatch(getAllProductUpdates))

router.get('/update/:productid/:updateid',
  tryCatch(getProductUpdateById))

router.post('/update/:productid',
  updateValidator.validateCreation,
  tryCatch(createProductUpdate))

router.put('/update/:productid/:updateid',
  updateValidator.validateUpdate,
  tryCatch(updateProductUpdate))

router.delete('/update/:productid/:updateid',
  tryCatch(deleteProductUpdate))

/**
 * Update Point
 */
router.get('/updatepoint/:productid/:updateid',
  tryCatch(getAllUpdateUpdatePoints))

router.get('/updatepoint/:productid/:updateid/:updatepointid',
  tryCatch(getUpdateUpdatePointById))

router.post('/updatepoint/:productid/:updateid',
  updatePointValidator.validateCreation,
  tryCatch(createUpdatePoint))

router.put('/updatepoint/:productid/:updateid/:updatepointid',
  updatePointValidator.validateUpdate,
  tryCatch(updateUpdatePoint))

router.delete('/updatepoint/:productid/:updateid/:updatepointid',
  tryCatch(deleteUpdatePoint))

export {
  router
}
