import type { UsersRepository } from "@/repositories/users-repository.js"
import type { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface EditarNomeUseCaseRequest {
    userId: string
    nome: string
}

interface EditarNomeUseCaseResponse {
    user: User
}

export class EditarNomeUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId, nome }: EditarNomeUseCaseRequest): Promise<EditarNomeUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        const updatedUser = await this.usersRepository.save({
            ...user,
            nome,
        })

        return { user: updatedUser }
    }
}