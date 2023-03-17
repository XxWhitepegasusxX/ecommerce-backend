import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ImportProductsUseCase } from './ImportProductsUseCase';

class ImportProductsController{
    async handle(req: Request, res: Response): Promise<Response>{
        
        const { file } = req;

        const importProductsUseCase = container.resolve(ImportProductsUseCase)
        try{
            await importProductsUseCase.execute(file)
        }catch(e){
            console.log(e)
        }

        return res.status(201).send();
    }
}

export { ImportProductsController }