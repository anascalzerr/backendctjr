import type { EmailsRepository } from "@/repositories/emails-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { NaoAutorizadoError } from "./errors/nao-autorizado-error.js";

interface GetEmailsEnviadosUseCaseRequest {
    userId: string
}

interface GetEmailsEnviadosUseCaseResponse {
    emails: {
        titulo: string
        enviado_por: string
        jaVisto: boolean
        email_id: string
    } []
}

export class GetEmailsEnviadosUseCase {
    constructor(
        private emailsRepository: EmailsRepository,
        private userRepository: UsersRepository,
    ) {}

    async execute({ userId }: GetEmailsEnviadosUseCaseRequest): Promise<GetEmailsEnviadosUseCaseResponse> {
        const usuarioLogado = await this.userRepository.findById(userId)

        if(!usuarioLogado) {
            throw new NaoAutorizadoError()
        }
        const emails = await this.emailsRepository.findManyByRemetente(userId)

        const emailsEnviados = await Promise.all(emails.map(async (email) => {
            return {
                titulo: email.title,
                enviado_por: usuarioLogado.nome,
                jaVisto: email.jaVisto,
                email_id: email.id,
            }
        }))

        return { emails: emailsEnviados }
    }
}