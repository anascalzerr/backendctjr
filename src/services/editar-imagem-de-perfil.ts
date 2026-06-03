import type { UsersRepository } from "@/repositories/users-repository.js"
import type { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface EditarImagemPerfilUseCaseRequest {
    userId: string
    fotoDePerfil: string
}

interface EditarImagemPerfilUseCaseResponse {
    user: User
}

export class EditarImagemPerfilUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId, fotoDePerfil }: EditarImagemPerfilUseCaseRequest): Promise<EditarImagemPerfilUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        const updatedUser = await this.usersRepository.save({
            ...user,
            fotoDePerfil,
        })

        return { user: updatedUser }
    }
}