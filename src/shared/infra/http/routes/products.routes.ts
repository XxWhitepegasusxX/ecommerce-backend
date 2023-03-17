import { Router } from "express";
import multer from "multer";

import { storage } from "@config/multerConfig";
import { CreateProductController } from "@modules/products/useCases/CreateProduct/CreateProductController";
import { ImportProductsController } from "@modules/products/useCases/ImportProducts/ImportProductsController";
import { DeleteProductController } from "@modules/products/useCases/DeleteProduct/DeleteProductController";
import { UpdateProductController } from "@modules/products/useCases/UpdateProduct/UpdateProductController";
import { ListProductsController } from "@modules/products/useCases/ListProducts/ListProductsController";
import { ListAvailableProductsController } from "@modules/products/useCases/ListAvailableProducts/ListAvailableProductsController";

const productsRoutes = Router()

const upload = multer({
    storage: storage
})

const createProductController = new CreateProductController()
const importProductsController = new ImportProductsController()
const deleteProductController = new DeleteProductController()
const updateProductController = new UpdateProductController()
const listProductsController = new ListProductsController()
const listAvailableProductsController = new ListAvailableProductsController()

productsRoutes.post('/create', createProductController.handle)
productsRoutes.post('/import', upload.single('file'), importProductsController.handle)
productsRoutes.delete('/:id', deleteProductController.handle)
productsRoutes.put('/update/:id', updateProductController.handle)
productsRoutes.get('/', listProductsController.handle)
productsRoutes.get('/available', listAvailableProductsController.handle)

export { productsRoutes }