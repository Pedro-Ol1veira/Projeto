import { ConflictError } from "@/Error/ConflictError";
import { Materia } from "./Materia";
import { Regex } from "./Regex";
import { UnprocessableError } from "@/Error/UnprocessableError";
import { Task } from "./Task";
import { NotFoundError } from "@/Error/NotFoundError";


export class Aluno {
    private materias: Materia[]; 
    private matricula: string;
    private curso: string;;
    private semIng: string;

    constructor(matricula: string, curso: string, semIng: string) {
        if(!matricula) {
            throw new UnprocessableError("A matricula é obrigatória");
        }

        if(!Regex.isValidMatricula(matricula)) {
            throw new UnprocessableError("A matricula deve conter exatamente 9 digitos e todos devem ser numeros de 0-9");
        }
        
        if(!curso) {
            throw new UnprocessableError("O curso é obrigatório");
        }
        if(!Regex.isValidAnoSemestre(semIng)) {
            throw new UnprocessableError("O ano de ingresso precisa ser valido. Ex: 2024-1");
        }
        this.matricula = matricula;
        this.curso = curso;
        this.semIng = semIng;
        this.materias = [];
    }

    public setMatricula(newMatricula: string): void {
        if(!newMatricula) {
            throw new UnprocessableError("A matricula é obrigatória");
        }

        if(!Regex.isValidMatricula(newMatricula)) {
            throw new UnprocessableError("A matricula deve conter exatamente 9 digitos e todos devem ser numeros de 0-9");
        }

        this.matricula = newMatricula;
    }

    public setSemIng(newSemIng: string): void {
        if(!Regex.isValidAnoSemestre(newSemIng)) {
            throw new UnprocessableError("O ano de ingresso precisa ser valido. Ex: 2024-1");
        }

        this.semIng = newSemIng;
    }

    public setCurso(newCurso: string): void {
        this.curso = newCurso;
    }

    public getMaterias(): Materia[] {
        return this.materias;
    }

    public getMateria(codigo: string): Materia {
        codigo = codigo.toUpperCase();
        const findMateria = this.materias.find((materia: Materia) => materia.getCodigo() == codigo);
        if(!findMateria) {
            throw new NotFoundError("Materia não encontrada");
        }

        return findMateria;
    }

    public deleteMateria(codigo: string): void {
        codigo = codigo.toUpperCase();
        const findMateria = this.materias.find((materia: Materia) => materia.getCodigo() == codigo);
        if(!findMateria) {
            throw new NotFoundError("Materia não encontrada");
        }
        this.materias = this.materias.filter((materia: Materia) => materia.getCodigo() != codigo);
    }
    
    public cadastrarMateria(newMateria: Materia): void {
        this.materias.map((materia: Materia) => {
            if(materia.getCodigo() == newMateria.getCodigo()) {
                throw new ConflictError("Materia ja cadastrada");
            }
        });

        this.materias.push(newMateria)
    }

    public cadastrarTask(newTask: Task, codigo: string): void {
        codigo = codigo.toUpperCase();
        const checkMateria = this.materias.find((materia: Materia) => materia.getCodigo() == codigo);
        if(checkMateria) {
            checkMateria.cadastrarTask(newTask);
        } else {
            throw new NotFoundError("A materia não foi cadastrada ainda");
        }

    }
}