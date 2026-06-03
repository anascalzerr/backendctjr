import type { EmailsRepository } from "@/repositories/emails-repository.js";
import { EmailNaoEncontradoError } from "./errors/email-nao-encontrado-error.js";
import { NaoAutorizadoError } from "./errors/nao-autorizado-error.js";

interface DeletarEmailUseCaseRequest {
    emailId: string
    userId: string
}


export class DeletarEmailUseCase {
    constructor(
        private emailsrepository: EmailsRepository,
    ) {}

    async execute({
        emailId, userId 
    }: DeletarEmailUseCaseRequest): Promise<void> {
        const email = await this.emailsrepository.findById(emailId)

        if (!email) {
            throw new EmailNaoEncontradoError()
        }

        if (email.jaVisto) {
            throw new NaoAutorizadoError()
        }

        if (email.idDeQuemEnviou != userId) {
            throw new NaoAutorizadoError()
        }

        await this.emailsrepository.delete(emailId)
    }
}