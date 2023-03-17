import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import fs from 'fs'
import {parse as csvParse} from 'csv-parse'
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

interface IImportProduct{
    name: string;
    description: string;
    price: string;
    size: string;
    stock: string;
}

@injectable()
class ImportProductsUseCase{
    constructor(@inject("ProductsRepository") private productsRepository: IProductsRepository){}

    async loadProducts(file: Express.Multer.File): Promise<IImportProduct[]>{
        try{
            return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const products: IImportProduct[] = []
            const parseFile = csvParse()
            stream.pipe(parseFile)
            parseFile.on('data', async (line) => {
                const [name, description, price, size, stock] = line;
                products.push({
                    name,
                    description,
                    price,
                    size,
                    stock
                })
            })
            .on("end", () => {
                fs.promises.unlink(file.path)
                resolve(products)
            })
            .on("error", (error) => {
                reject(error)
            })
            })
        }catch(e){
            throw new AppError(e)
        }
    }

    async execute(file: Express.Multer.File): Promise<void>{

        const products = await this.loadProducts(file);

        products.map( async (product) => {
            const { name, description, price, size, stock } = product;

            const existProduct = await this.productsRepository.findByName(name);

            const sizes = size.split(' ')

            if(!existProduct){
                try{
                    await this.productsRepository.create({
                    name,
                    description,
                    price: parseFloat(price),
                    sizes,
                    stock: parseInt(stock)
                    })

                }catch(e){
                    console.log(e)
                }
            }
            
        })
    }
}

export { ImportProductsUseCase }