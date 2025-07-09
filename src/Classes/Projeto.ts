import { Prova } from "./Prova";


export class Projeto extends Prova {
    private descricao: string;

    constructor(dataPassada: string, dataDeEntrega: string, valor: number, descricao: string) {
        super(valor, dataPassada, dataDeEntrega);
        this.descricao = descricao;
    }

    public setDescricao(newDescricao: string): void {
        this.descricao = newDescricao;
    } 
}