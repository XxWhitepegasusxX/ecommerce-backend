import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { Category } from "@prisma/client";
import { inject, injectable } from "tsyringe";

interface IDeleteCategory{
    name?: string;
    id?: number;
}

@injectable()
class DeleteCategoryUseCase{
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository){}

    async execute(data: IDeleteCategory): Promise<Category>{
        return await this.categoriesRepository.deleteCategory(data)
    }
}

export { DeleteCategoryUseCase }