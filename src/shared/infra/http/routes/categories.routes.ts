import { Router } from 'express'
import multer from 'multer'

import { storage } from "@config/multerConfig";
import { CreateCategoryController } from '@modules/categories/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/categories/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/categories/useCases/listCategories/ListCategoriesController';
import { DeleteCategoryController } from '@modules/categories/useCases/deleteCategory/DeleteCategoryController';

const categoriesRoutes = Router()

const upload = multer({
    storage: storage
})

const deleteCategoryController = new DeleteCategoryController()
const listCategoriesController = new ListCategoriesController()
const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.delete('/', deleteCategoryController.handle)
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export { categoriesRoutes }