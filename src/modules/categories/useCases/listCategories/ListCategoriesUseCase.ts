import { inject, injectable } from 'tsyringe';
import { Category } from '@prisma/client';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ListCategoriesUseCase{
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository){}

    async execute(): Promise<Category[]>{
        try{
            return await this.categoriesRepository.listCategories();
        }catch(e){
            throw new AppError(e)
        }
    }
}

export { ListCategoriesUseCase }