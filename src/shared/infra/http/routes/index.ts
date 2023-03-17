import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { productsRoutes } from "./products.routes";

const router = Router()

router.use("/products", productsRoutes)
router.use("/categories", categoriesRoutes)

export { router }