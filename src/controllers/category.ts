import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Category} from "../entity/Category";

export async function post(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);

    const newCategory = categoryRepository.create(request.body);

    await categoryRepository.save(newCategory);

    response.send({'Result':'Success','Response':newCategory});
}

export async function getAll(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const categories = await categoryRepository.find( { relations: ["question"] });
    if(categories.length == 0) response.send({'Result':'Success', Response: 'No categories found.'});
    response.send({'Result':'Success','Response':categories});
}

export async function getOne(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id, { relations: ["posts"] });

    // if category was not found return 404 to the client
    if (!category) {
        return response.status(404).json({'Result':'Failure', Response: 'category not found'});
    }

    response.send({'Result':'Success','Response':category});
}

export async function put(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id);

    // if category was not found return 404 to the client
    if (!category) {
        return response.status(404).json({'Result':'Failure', Response: 'category not found'});
    }

    category.name = request.body.name || category.name;

    await categoryRepository.update(request.params.id,request.body)

    response.send({'Result':'Success','Response':category});
}

export async function remove(request: Request, response: Response) {
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.params.id);

    // if category was not found return 404 to the client
    if (!category) {
        return response.status(404).json({'Result':'Failure', Response: 'category not found'});
    }

    await categoryRepository.remove(category);

    response.send({'Result':'Success'});
}