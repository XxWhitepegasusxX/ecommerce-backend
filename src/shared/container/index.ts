import { container } from "tsyringe";

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { ProductsRepository } from "@modules/products/infra/prismaORM/repositories/ProductsRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/categories/infra/prismaORM/repositories/CategoriesRepository";

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
)

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)