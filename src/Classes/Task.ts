import { UnprocessableError } from "@/Error/UnprocessableError";
import { randomUUID, UUID } from "crypto";
import {parse, isValid, isBefore} from 'date-fns';

export class Task {
    private id: UUID = randomUUID()
    private dataPassada: Date;
    private dataDeEntrega: Date;
    private completa: boolean;
    constructor(dataPassada: string, dataDeEntrega: string) {
        
        const formatDataPassada = parse(dataPassada, 'dd/MM/yyyy', new Date());
        const formatDataDeEntrega = parse(dataDeEntrega, 'dd/MM/yyyy', new Date());

        if(!isValid(formatDataDeEntrega) || !isValid(formatDataPassada)) {
            throw new UnprocessableError("A data de entrega e a data passada precisam estar no formato DD/MM/AAAA");
        }

        if(isBefore(formatDataDeEntrega, formatDataPassada)) {
            throw new UnprocessableError("A data de entrega não pode ser anterior a data passada");
        }
        this.dataPassada = formatDataPassada;
        this.dataDeEntrega = formatDataDeEntrega;
        this.completa = false;
    }

    public getId(): string {
        return this.id;
    }

    public completarTask(): void {
        if(this.completa) {
            throw new UnprocessableError("A tarefa já esta completa");
        }
        this.completa = true;
    }

    public updateDatas(newDataPassada: string, newDataDeEntrega: string): void {
        if(!newDataDeEntrega || !newDataPassada) {
            throw new UnprocessableError("A data passada e a data de entrega são obrigatória");
        }
        
        const formatDataPassada = parse(newDataPassada, 'dd/MM/yyyy', new Date());
        const formatDataDeEntrega = parse(newDataDeEntrega, 'dd/MM/yyyy', new Date());

        if(!isValid(formatDataDeEntrega) || !isValid(formatDataPassada)) {
            throw new UnprocessableError("A data de entrega e a data passada precisam estar no formato DD/MM/AAAA");
        }

        if(isBefore(formatDataDeEntrega, formatDataPassada)) {
            throw new UnprocessableError("A data de entrega não pode ser anterior a data passada");
        }

        this.dataDeEntrega = formatDataDeEntrega;
        this.dataPassada = formatDataPassada;
    }

    public getStatus(): boolean {
        return this.completa;
    }
}