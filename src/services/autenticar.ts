import type { UsersRepository } from "@/repositories/users-repository.js";
import { CredencialInvalidaError } from "./errors/credencial-invalida-error.js";
import type { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AutenticarUseCaseRequest {
    email: string
    senha: string
}

interface AutenticarUseCaseResponse {
    user: User
}

export class AutenticarUseCase {
    constructor(
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        email, senha 
    }: AutenticarUseCaseRequest): Promise<AutenticarUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new CredencialInvalidaError()
        }

        const doesPasswordMatches = await compare(senha, user.senha)
        
        if (!doesPasswordMatches) {
            throw new CredencialInvalidaError()
        }

        return {
            user,
        }
    }
}