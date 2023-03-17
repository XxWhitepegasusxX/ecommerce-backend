import { injectable, inject } from "tsyringe";

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { Product } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

interface IRequest{
    name: string;
    description: string;
    price: number;
    sizes: string[];
    gender?: string;
    brand?: string;
    colors?: string[];
    stock?: number;
    installments?: number;
    interest?: number;
}

@injectable()
class CreateProductUseCase{
    constructor(@inject("ProductsRepository") private productsRepository: IProductsRepository){}

    async execute(data: IRequest): Promise<Product>{
        const productAlreadyExists = await this.productsRepository.findByName(data.name)
        
        if(productAlreadyExists){
            throw new AppError("Product already exists")
        }

        return await this.productsRepository.create(data)
    }

}

export { CreateProductUseCase }