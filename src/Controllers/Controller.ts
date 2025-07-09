import { Aluno } from "@/Classes/Aluno";
import { Materia } from "@/Classes/Materia";
import { Projeto } from "@/Classes/Projeto";
import { Prova } from "@/Classes/Prova";
import { Task } from "@/Classes/Task";
import { db } from "@/db";
import { UnprocessableError } from "@/Error/UnprocessableError";
import { ICreateAluno } from "@/Interfaces/ICreateAluno";
import { IFiltro } from "@/Interfaces/IFiltro";
import { INewMateria } from "@/Interfaces/INewMateria";
import { INewTask } from "@/Interfaces/INewTask";
import { IUpdateAluno } from "@/Interfaces/IUpdateAluno";
import { IUpdateTask } from "@/Interfaces/IUpdateTask";
import { Request, Response } from "express";

export class Controller {
    public async create(req: Request, res: Response): Promise<void> {
        const data: ICreateAluno = req.body;

        try {
            db.aluno = new Aluno(data.matricula, data.curso, data.semIng);
            res.status(201).json(db.aluno);
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});
        }
    }

    public async cadastrarMateria(req: Request, res: Response): Promise<void> {
        const data: INewMateria = req.body;

        try {
            const newMateria = new Materia(data.codigo, data.nome);
            db.aluno.cadastrarMateria(newMateria);
            res.status(200).json(db.aluno);
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});
        }
    }

    public async cadastrarTask(req: Request, res: Response): Promise<void> {
        const codigoMateria = req.params.codigoMateria.toUpperCase();
        const data: INewTask = req.body;

        try {
            if(data.descricao && data.valor) {
                const newProjeto = new Projeto(data.dataPassada, data.dataDeEntrega, data.valor, data.descricao);
                db.aluno.cadastrarTask(newProjeto, codigoMateria);
            } else if(data.valor) {
                const newProva = new Prova(data.valor, data.dataPassada, data.dataDeEntrega);
                db.aluno.cadastrarTask(newProva, codigoMateria);
            } else {
                const newTask = new Task(data.dataPassada, data.dataDeEntrega);
                db.aluno.cadastrarTask(newTask, codigoMateria);
            }
            
            res.status(201).json(db.aluno);
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});
        }
        
    }

    public async getMaterias(req: Request, res: Response): Promise<void> {

        try {
            res.status(200).json(db.aluno.getMaterias());
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});   
        }
    }

    public async getTasks(req: Request, res: Response): Promise<void> {
        const codigoMateria = req.params.codigo.toUpperCase();

        const status = req.query.status;

        let filtro: IFiltro = {};
        
        try {
            if(status) {
                if(status == 'completas') {
                    filtro.status = "completas";
                } else if(status == 'incompletas') {
                    filtro.status = "incompletas";
                } else {
                    throw new UnprocessableError("Os status do filtro pode ser apenas completas ou incompletas");
                }   
            }
            res.status(200).json(db.aluno.getMateria(codigoMateria).getTasks(filtro));
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});   
        }
    }

    public async concluirTask(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const codigoMateria = req.params.codigo.toUpperCase();
        const nota = req.body.nota;
        try {
            const task = db.aluno.getMateria(codigoMateria).getTask(id);

            if((task instanceof Prova || task instanceof Projeto)) {
                task.lancarNota(nota);
                task.completarTask();
            } else {
                task.completarTask();
            }

            db.aluno.getMateria(codigoMateria).calculaMedia();
            
            res.status(200).json(db.aluno.getMateria(codigoMateria).getTask(id));
        } catch (err: any) {
           if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});   
        }
        
    }

    public async getTask(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const codigoMateria = req.params.codigo.toUpperCase();
        try {
            res.status(200).json(db.aluno.getMateria(codigoMateria).getTask(id));
        } catch (err: any) {
           if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message});   
        }
    }

    public async uptadeTask(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const codigoMateria = req.params.codigo.toUpperCase();

        const data: IUpdateTask = req.body;

        
        try {
            const task = db.aluno.getMateria(codigoMateria).getTask(id);
            if(task.getStatus()) {
                throw new UnprocessableError("Você não pode alterar uma tarefa que já foi concluida");
            }
            if(task instanceof Prova && data.valor) {
                task.setValor(data.valor)
            }

            if(task instanceof Projeto) {
                if(data.valor) {
                    task.setValor(data.valor);
                }
                if(data.descricao) {
                    task.setDescricao(data.descricao);
                }
            }

            task.updateDatas(data.dataPassada, data.dataDeEntrega);
            res.status(200).json(task);
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message}); 
        }
        
    }

    public async updateAluno(req: Request, res: Response) {
        const data: IUpdateAluno = req.body;

        try {
            if(data.curso) {
                db.aluno.setCurso(data.curso);
            }
            if(data.matricula) {
                db.aluno.setMatricula(data.matricula);
            }
            if(data.semIng) {
                db.aluno.setSemIng(data.semIng);
            }
            res.status(200).json(db.aluno);
        } catch (err: any) {
            if(!err.status) {
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message}); 
        }

    }

    public async deleteMateria(req: Request, res: Response) {
        const codigo: string = req.params.codigo.toUpperCase();

        try {
            db.aluno.deleteMateria(codigo);
            res.status(200).json(db.aluno.getMaterias());
        } catch (err: any) {
            if(!err.status) {
                console.log(err);
                res.status(500).json({error: "Ocorreu um erro no servidor tente novamente mais tarde"});
                return;
            }
            res.status(err.status).json({error: err.message}); 
        }
    }
}