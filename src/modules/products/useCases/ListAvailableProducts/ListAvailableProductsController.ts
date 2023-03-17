import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableProductsUseCase } from "./ListAvailableProductsUseCase";

class ListAvailableProductsController{
    async handle(req: Request, res: Response): Promise<Response>{

        const listAvailableProductsUseCase = container.resolve(ListAvailableProductsUseCase)
        
        const products = await listAvailableProductsUseCase.execute()
        
        return res.json(products)
    }
}

export { ListAvailableProductsController }