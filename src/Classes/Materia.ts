import { NotFoundError } from "@/Error/NotFoundError";
import { Task } from "./Task";
import { IFiltro } from "@/Interfaces/IFiltro";
import { UnprocessableError } from "@/Error/UnprocessableError";
import { Prova } from "./Prova";
import { Projeto } from "./Projeto";
import { Regex } from "./Regex";

export class Materia {
    private codigo: string;
    private nome: string;
    private media: number;
    private tasks: Task[];
    constructor(codigo: string, nome: string) {
        if(!codigo) {
            throw new UnprocessableError("O codigo é obrigatório");
        }

        if(!Regex.isValidCodigoMateria(codigo)) {
            throw new UnprocessableError("O codigo da materia deve esta no formato: AAAA99");
        }

        if(!nome) {
            throw new UnprocessableError("O nome é obrigatório");
        }

        this.codigo = codigo.toUpperCase();
        this.nome = nome;
        this.media = 0;
        this.tasks = [];
    }

    public getCodigo(): string {
        return this.codigo;
    }

    public cadastrarTask(newTask: Task): void {
        this.tasks.push(newTask);
    }

    public  getTasks(filtro?: IFiltro): Task[] {
        let searchTasks: Task[] = [];

        if(!filtro?.status) {
            searchTasks = this.tasks;
        }

        if(filtro?.status == 'completas') {
            searchTasks = this.tasks.filter((task: Task) => task.getStatus() == true);
        } else if (filtro?.status == 'incompletas') {
            searchTasks = this.tasks.filter((task: Task) => task.getStatus() == false);
        }
        return searchTasks;
    }

    public getTask(id: string): Task {
        const checkTask = this.tasks.find((task: Task) => task.getId() == id);
        if(!checkTask) {
            throw new NotFoundError("Tarefa não encontrada");
        }
        return checkTask;
    }

    public deleteTask(id: string): Task[] {
        const checkTask = this.tasks.find((task: Task) => task.getId() == id);
        if(!checkTask) {
            throw new NotFoundError("Tarefa não encontrada");
        }
        this.tasks = this.tasks.filter((task: Task) => task.getId() != id);
        return this.tasks;
    }

    public calculaMedia(): void {
        let somaNotas = 0;
        let totalProvas = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if(task instanceof Prova || task instanceof Projeto) {
                somaNotas += task.getNota()
                totalProvas++;
            }
        }

        this.media = somaNotas / totalProvas;
    }

}