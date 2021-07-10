import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Question} from "../entity/Question";
import { Category } from "../entity/Category";
import {validate} from "class-validator";

export async function post(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    const categoryRepository = getManager().getRepository(Category);
    const category = await categoryRepository.findOne(request.body.categoryId)
    console.log(category)
    if(!category){
        return response.status(400).json({'Result':'Failure', Response: 'Category not found'});
    }
    const newQuestion = questionRepository.create(request.body);
    const errors = await validate(newQuestion);
    if (errors.length > 0) {
        return response.status(400).json({'Result':'Success', Response: errors});
    } else {
        try{
            await questionRepository.save(newQuestion);
            response.send({'Result':'Success', Response: newQuestion});
        }catch(e){
            return response.status(500).json({'Result':'Failure', Response: e});
        }
    }
}

export async function getAll(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    const questions = await questionRepository.find({ relations: ["category"] });
    if(questions.length > 0) response.send({'Result':'Success', Response: questions});
    response.send({'Result':'Success', Response: 'No questions found.'});
}

export async function getOne(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    const question = await questionRepository.findOne(request.params.id, { relations: ["category"] });

    // if question was not found return 404 to the client
    if (!question) {
        return response.status(404).json({'Result':'Failure', Response: 'Question not found'});
    }
    response.send({'Result':'Success','Response':question});
}

export async function put(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    const categoryRepository = getManager().getRepository(Category);
    const question = await questionRepository.findOne(request.params.id);
    // if question was not found return 404 to the client
    if (!question) {
        return response.status(404).json({'Result':'Failure', Response: 'Question not found'});
    }
    if(request.body.categoryId && request.body.categoryId != question.categoryId){
        const category = await categoryRepository.findOne(request.body.categoryId)
        if(!category){
            return response.status(400).json({'Result':'Failure', Response: 'Category not found'});
        }
        question.categoryId = request.body.categoryId
    }
    
    question.question = request.body.question || question.question;

    const errors = await validate(question);
    if (errors.length > 0) {
        return response.status(400).json({'Result':'Failure', Response: errors});
    } else {
        try{
            await questionRepository.update(question.id,request.body)
            response.send({'Result':'Success', Response: question});
        }catch(e){
            return response.status(500).json({'Result':'Failure', Response: e});
        }
    }
}

export async function remove(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    const question = await questionRepository.findOne(request.params.id);

    // if question was not found return 404 to the client
    if (!question) {
        return response.status(404).json({success: false, Response: 'Question not found'});
    }

    await questionRepository.remove(question);

    response.send({'Result':'Success'});
}

export async function validateQuestion(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    let qid = [];
    let optionid = [];
    let score = 0;
    request.body.forEach(each => {
       qid.push(each.questionId)
       optionid.push(each.optionId)
    });
    const questions = await questionRepository.findByIds(qid);
    console.log(questions);
    if(questions.length == 0) response.send({'Result':'Success', Response: 'No questions found with the given input'});
    for(var i=0;i<questions.length;i++){
        console.log(questions[i].correctOptionIndex,optionid[i])
        if(questions[i].correctOptionIndex == optionid[i]){
            score++;
        }
    }

    response.send({'Result':'Success','score':score});

}