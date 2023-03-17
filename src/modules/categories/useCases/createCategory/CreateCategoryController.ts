import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController{

    async handle(req: Request, res: Response): Promise<Response>{
        
        const data = req.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        const category = await createCategoryUseCase.execute(data)

        return res.json({"Category Created": category})
    }
}

export { CreateCategoryController }