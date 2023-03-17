import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { Product } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAvailableProductsUseCase{
    constructor(@inject("ProductsRepository") private productRepository: IProductsRepository){}

    async execute(): Promise<Product[]>{
        const allproducts = await this.productRepository.listProducts()

        const availableProducts = allproducts.filter(product => product.stock >= 1)

        return availableProducts;
    }
}

export { ListAvailableProductsUseCase }