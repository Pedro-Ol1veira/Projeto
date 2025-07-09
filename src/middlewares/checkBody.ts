import {Request, Response, NextFunction} from 'express';

const checkBody = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body) {
        res.status(422).json({error: "O body precisa ser enviado"});
        return;
    }

    next();
}

export default checkBody;