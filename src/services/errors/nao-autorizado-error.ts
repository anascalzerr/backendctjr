export class NaoAutorizadoError extends Error {
    constructor() {
        super('Não autorizado')
    }
}