import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteProductUseCase{
    constructor(@inject("ProductsRepository") private productsRepository: IProductsRepository){}

    async execute(id: string): Promise<void>{

        const productExists = await this.productsRepository.findById(id)

        if(!productExists){
            throw new AppError("Product not found")
        }
        try{
            await this.productsRepository.deleteProduct(id)
        }catch(e){
            throw new AppError(e)
        }
    }
}

export { DeleteProductUseCase }