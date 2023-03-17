import { Product } from "@prisma/client";
import { ICreateproductsDTO } from "../dtos/ICreateproductsDTO";

interface IProductsRepository{
    create(data: ICreateproductsDTO): Promise<Product>;
    updateProducts(product_id: string, data: any): Promise<Product>;
    listProducts(): Promise<Product[]>; 
    findByName(name: string): Promise<Product>; //Utilizar para verificação
    findById(id: string): Promise<Product>; //Utilizar para verificação
    findByUrlName(urlName: string): Promise<Product>; // Utilizar para devolver o produto para uma página única por exemplo
    deleteProduct(product_id: string): Promise<void>; // Somente Admin
}

export { IProductsRepository }