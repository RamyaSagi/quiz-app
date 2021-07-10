import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";
import { config } from "../config";
import jwt from "jwt-simple";

export async function post(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);

    console.log(request.body.categoryId);
    if(!request.body.name || !request.body.password){
        response.status(400);
        response.send({'Result':'name and password are required fields'});
        response.end();
        return;   
    }
    const newQuestion = userRepository.create(request.body);

    await userRepository.save(newQuestion);

    response.send(newQuestion);
}

export async function getAll(request: Request, response: Response) {
    console.log(request.headers.authorization);
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find({});

    response.send(users);
}

export async function getToken(request: Request, response: Response) {

    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({name:request.body.name,password:request.body.password});

    // if question was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.send({'Result':'Not a valid user'});
        response.end();
        return;
    }else{
        var payload = {
            id: user.id
        };
        var token = jwt.encode(payload, config.jwtSecret);
        response.json({
            token: 'jwt '+token
        });
    } 
}


