import { container } from 'tsyringe';
import { Request, Response } from "express";

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController{

    async handle(req: Request, res: Response): Promise<Response>{

        const data = req.body;

        const createProductUseCase = container.resolve(CreateProductUseCase)

        const product = await createProductUseCase.execute(data)

        return res.status(201).json({"Product created": product})
    }

}

export { CreateProductController }