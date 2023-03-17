import { ICreateproductsDTO } from "@modules/products/dtos/ICreateproductsDTO";
import { Product } from "@prisma/client";
import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository{
    
    create(data: ICreateproductsDTO): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    updateProducts(product_id: string, data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    listProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    deleteProduct(product_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}