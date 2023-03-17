import { Category } from '@prisma/client';
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from '@shared/errors/AppError';

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase{
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository){}

    async execute(data: IRequest): Promise<Category>{

        const categoryExist = await this.categoriesRepository.findByName(data.name)

        if(categoryExist){
            throw new AppError("Category already exists")
        }
        const category = await this.categoriesRepository.create(data)

        return category
    }
}

export { CreateCategoryUseCase }