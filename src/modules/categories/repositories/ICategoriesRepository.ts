import { Category } from "@prisma/client";

import { ICreatecategoriesDTO } from "../dtos/ICreatecategoriesDTO";

interface ICategoriesRepository{
    create(data: ICreatecategoriesDTO): Promise<Category>
    findById(id: string): Promise<Category>
    findByName(name: string): Promise<Category>
    listCategories(): Promise<Category[]>
    deleteCategory(data): Promise<Category>
}

export { ICategoriesRepository }