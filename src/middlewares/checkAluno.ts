import { db } from '@/db';
import {Request, Response, NextFunction} from 'express';

const checkAluno = (req: Request, res: Response, next: NextFunction) => {
    if(!db.aluno) {
        res.status(401).json({error: "O aluno precisa estar cadastrado"});
        return;
    }

    next();
}

export default checkAluno;