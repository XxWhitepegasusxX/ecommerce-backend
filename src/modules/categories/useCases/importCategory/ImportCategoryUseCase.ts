import { inject, injectable } from "tsyringe";
import fs from 'fs'
import {parse as csvParse} from 'csv-parse'

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IImportCategories{
    name: string;
    description: string
}

@injectable()
class ImportCategoryUseCase{
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository){}

    async loadCategories(file: Express.Multer.File): Promise<IImportCategories[]>{
        try{
            return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const categories: IImportCategories[] = []
            const parseFile = csvParse()
            stream.pipe(parseFile)
            parseFile.on('data', async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description,
                })
            })
            .on("end", () => {
                fs.promises.unlink(file.path)
                resolve(categories)
            })
            .on("error", (error) => {
                reject(error)
            })
            })
        }catch(e){
            throw new console.log(e)
        }
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file)

        categories.map(async (category) => {
            const { name, description } = category;

            const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

            if(!categoryAlreadyExists){
                try{
                    await this.categoriesRepository.create({name, description})
                }catch(e){
                    console.log(e)
                }
            }
        })
    }
}

export { ImportCategoryUseCase }