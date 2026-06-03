export class SenhasNaoCoincidemError extends Error {
    constructor() {
        super("As senhas devem ser iguais")
    }
}