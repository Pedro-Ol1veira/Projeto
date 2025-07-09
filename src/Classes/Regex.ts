export class Regex {
    public static regexAnoSem = /^(19|20)\d{2}-(1|2)$/;
    public static regexMatricula = /^\d{9}$/;
    public static regexCodigoMateria = /^[A-Za-z]{4}\d{2}$/;

    public static isValidAnoSemestre(anoSem: string): boolean {
        return this.regexAnoSem.test(anoSem);
    }

    public static isValidMatricula(matricula: string): boolean {
        return this.regexMatricula.test(matricula);
    }

    public static isValidCodigoMateria(codigo: string): boolean {
        return this.regexCodigoMateria.test(codigo);
    }
    
}