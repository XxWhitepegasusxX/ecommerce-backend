import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController{

    async handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params
        const data = req.body
        
        const updateProductUseCase = container.resolve(UpdateProductUseCase)
        
        const newProduct = await updateProductUseCase.execute(id, data)
        
        return res.status(200).json(newProduct)
    }
}

export { UpdateProductController }