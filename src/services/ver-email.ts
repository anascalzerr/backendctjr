import type { EmailsRepository } from "@/repositories/emails-repository.js";
import type { Email } from "@prisma/client";
import { EmailNaoEncontradoError } from "./errors/email-nao-encontrado-error.js";
import { NaoAutorizadoError } from "./errors/nao-autorizado-error.js";

interface GetVerEmailUseCaseRequest {
    emailId: string
    userId: string
}

interface GetVerEmailUseCaseResponse {
    email: Email
}

export class GetVerEmailUseCase {
    constructor( private emailsRepository: EmailsRepository ) {}

    async execute({ emailId, userId }: GetVerEmailUseCaseRequest): Promise<GetVerEmailUseCaseResponse> {
        const email = await this.emailsRepository.findById(emailId)

        if(!email) {
            throw new EmailNaoEncontradoError()
        }

        if(email.idDeQuemEnviou != userId && email.idDeQuemRecebeu != userId) {
            throw new NaoAutorizadoError()
        }

        if(email.idDeQuemRecebeu == userId && !email.jaVisto) {
            await this.emailsRepository.save({ ...email, jaVisto: true })
        }

        return { email }
    }
}