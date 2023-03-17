import { Category, PrismaClient } from "@prisma/client";

import { ICreatecategoriesDTO } from "@modules/categories/dtos/ICreatecategoriesDTO";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { prisma } from "@shared/services/prismaClient";

class CategoriesRepository implements ICategoriesRepository{
    
    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }

    async create(data: ICreatecategoriesDTO): Promise<Category> {
        try{
            const category = await this.prisma.category.create({data})
            return category
        }catch(e){
            throw new AppError(e)
        }
    }

    async findById(id: string): Promise<Category> {
        try{
            const category = await this.prisma.category.findUnique({
                where: {id}
            })
            return category
        }catch(e){
            throw new AppError(e)
        }
    }

    async findByName(name: string): Promise<Category> {
        try{
            const category = await this.prisma.category.findFirst({
                where: {name}
            })
            return category
        }catch(e){
            throw new AppError(e)
        }
    }

    async listCategories(): Promise<Category[]> {
        try{
            const categories = await this.prisma.category.findMany({
                include: {products: true}
            })
            return categories;
        }catch(e){
            throw new AppError(e)
        }
    }

    async deleteCategory(data): Promise<Category> {
        try{
            return await this.prisma.category.delete({
                where: {...data}
            })
        }catch(e){
            throw new AppError(e)
        }
    }

}

export { CategoriesRepository }