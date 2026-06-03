import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { AutenticarUseCase } from "../autenticar.js"

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AutenticarUseCase(usersRepository)

    return authenticateUseCase
}