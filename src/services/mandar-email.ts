import type { Email } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import type { EmailsRepository } from "@/repositories/emails-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";

interface MandarEmailUseCaseRequest {
    userId: string
    emailDestinatario: string
    title: string
    content: string
}

interface MandarEmailUseCaseResponse {
    email: Email
}

export class MandarEmailUseCase {
    constructor(
        private emailsRepository: EmailsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        userId, emailDestinatario, title, content
    }: MandarEmailUseCaseRequest): Promise<MandarEmailUseCaseResponse> {
        const destinatario = await this.usersRepository.findByEmail(emailDestinatario)

        if (!destinatario) {
            throw new ResourceNotFoundError()
        }

        const email = await this.emailsRepository.create({
            title,
            content,
            idDeQuemEnviou: userId,
            idDeQuemRecebeu: destinatario.id,
        })

        return { email }
    }
}