export class EmailNaoEncontradoError extends Error {
    constructor() {
        super('E-mail não encontrado.')
    }
}