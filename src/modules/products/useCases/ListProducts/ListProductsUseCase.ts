import { inject, injectable } from "tsyringe";
import { Product } from "@prisma/client";

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListProductsUseCase{
    constructor(@inject("ProductsRepository") private productsRepository: IProductsRepository){}

    async execute(): Promise<Product[]>{
        try{
            const products = await this.productsRepository.listProducts()
            return products
        }catch(e){
            throw new AppError(e)
        }
    }
}

export { ListProductsUseCase }