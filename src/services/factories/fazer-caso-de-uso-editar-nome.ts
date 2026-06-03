import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { EditarNomeUseCase } from "../editar-nome.js";

export function makeEditarNomeUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new EditarNomeUseCase(usersRepository)
}