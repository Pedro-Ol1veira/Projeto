import { UnprocessableError } from "@/Error/UnprocessableError";
import { Task } from "./Task";
 

export class Prova extends Task {
    private valor: number;
    private notaTirada: number;

    constructor(valor: number, dataPassada: string, dataDeEntrega: string) {
        super(dataPassada, dataDeEntrega);
        this.notaTirada = 0;
        if(valor < 0 || valor > 10 || !Number.isInteger(valor)) {
            throw new UnprocessableError("O valor da prova deve estar entre 0 e 10");
        }
        
        this.valor = valor;
    }

    public lancarNota(nota: number): void {
        if(!nota || !Number.isInteger(nota) || nota > 10 || nota < 0) {
            throw new UnprocessableError("A nota deve ser um inteiro de 0 a 10");
        }
        if(nota > this.valor) {
            throw new UnprocessableError("A nota para ser lançada não pode ser maior que o valor");
        }
        this.notaTirada = nota;
    }

    public getNota(): number {
        return this.notaTirada;
    }

    public setValor(newValor: number): void {
        if(newValor < 0 || newValor > 10 || !Number.isInteger(newValor)) {
            throw new UnprocessableError("O valor da prova deve estar entre 0 e 10");
        }
        
        this.valor = newValor;
    }
}