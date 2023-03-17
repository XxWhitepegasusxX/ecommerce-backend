import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController{
    async handle(req: Request, res: Response): Promise<Response>{
        const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)

        const data = req.body;

        const category = await deleteCategoryUseCase.execute(data)

        return res.json({"Category Deleted": category})
    }
}

export { DeleteCategoryController }