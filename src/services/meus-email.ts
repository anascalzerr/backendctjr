import type { EmailsRepository } from "@/repositories/emails-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";

interface GetMeusEmailsUseCaseRequest {
    idDeQuemRecebeu: string
}

interface GetMeusEmailsUseCaseResponse {
    emails: {
        titulo: string
        enviado_por: string
        jaVisto: boolean
        email_id: string
    }[]
}

export class GetMeusEmailsUseCase {
    constructor(
        private emailsRepository: EmailsRepository,
        private userRepository: UsersRepository,
    ) {}

    async execute({ idDeQuemRecebeu }: GetMeusEmailsUseCaseRequest): Promise<GetMeusEmailsUseCaseResponse> {
        const emails = await this.emailsRepository.findByDestinatario(idDeQuemRecebeu)

        const emailsRecebidos = await Promise.all(emails.map(async (email) => {
            const remetente = await this.userRepository.findById(email.idDeQuemEnviou)
            return {
                titulo: email.title,
                enviado_por: remetente!.nome,
                jaVisto: email.jaVisto,
                email_id: email.id,
            }
        }))

        return { emails: emailsRecebidos }
    }
}