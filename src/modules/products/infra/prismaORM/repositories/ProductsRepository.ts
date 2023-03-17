import { PrismaClient, Product } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { ICreateproductsDTO } from "src/modules/products/dtos/ICreateproductsDTO";
import { IProductsRepository } from "src/modules/products/repositories/IProductsRepository";
import { prisma } from "@shared/services/prismaClient";

class ProductsRepository implements IProductsRepository{
    
    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }
    
    async findById(id: string): Promise<Product> {
        try{
            return await this.prisma.product.findUnique({
                where: {
                    id,
                }
            })
        }catch(e){
            throw new AppError(e)
        }
    }


    async findByUrlName(urlName: string): Promise<Product> {
        try{
            return await this.prisma.product.findFirst({where: {
                urlName,
            }})
        }catch(e){
            throw new AppError(e)
        }
    }

    async create({name, description, price, sizes, brand, colors, gender, installments, interest, stock}: ICreateproductsDTO): Promise<Product> {
        const urlName = name.toLocaleLowerCase().replace(" ", "")
        try{
            return await this.prisma.product.create({
            data: {
                name,
                description,
                price,
                sizes,
                brand,
                colors,
                gender,
                installments,
                interest,
                stock,
                urlName,
            }
            })
        }catch(e){
            throw new AppError(e)
        }
    }

    async updateProducts(product_id: string, data: any): Promise<Product> {
        try{
            const product = await this.prisma.product.update({
                data: data,
                where: {
                    id: product_id
                },
                include: {
                    categories: true
                }
            })
            return product
        }catch(e){
            throw new AppError(e)
        }

    }

    async listProducts(): Promise<Product[]> {
        try{
            return await this.prisma.product.findMany({
                include: {
                    Purchase: true,
                    categories: true,
                }
            })
        }catch(e){
            throw new AppError(e)
        }
    }

    async deleteProduct(product_id: string): Promise<void>{
        try{
            await this.prisma.product.delete({
                where: {
                    id: product_id
                }
            })
        }catch(e){
            throw new AppError(e)
        }
    }

    async findByName(name: string): Promise<Product>{
        try{
            return await this.prisma.product.findFirst({where: {
                name,
            }})
        }catch(e){
            throw new AppError(e)
        }
    }
}

export { ProductsRepository }