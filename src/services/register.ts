import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-ja-tem-email.js"
import type { User } from "@prisma/client"
import { SenhasNaoCoincidemError } from "./errors/senhas-nao-coincidem.js"

interface RegisterUseCaseRequest {
    nome: string
    email: string
    senha: string
    confirmarSenha: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}
    
    async execute({ nome, email, senha, confirmarSenha }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        if(senha != confirmarSenha) {
            throw new SenhasNaoCoincidemError()
        }
        
        const senha_hash = await hash(senha, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            nome,
            email,
            senha: senha_hash,
        })

        return {
            user,
        }
    }
}