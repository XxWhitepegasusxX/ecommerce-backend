import { inject, injectable } from "tsyringe";
import { Product } from "@prisma/client";

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateProductUseCase{
    constructor(@inject("ProductsRepository") private productsRepository: IProductsRepository){}

    async execute(id: string, data: any): Promise<Product>{

        const productExist = await this.productsRepository.findById(id)

        if(!productExist){
            throw new AppError("Product not found")
        }

        try{
            return await this.productsRepository.updateProducts(id, data)
        }catch(e){
            throw new AppError(e)
        }
    }

}

export { UpdateProductUseCase }