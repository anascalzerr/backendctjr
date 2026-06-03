import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { EditarImagemPerfilUseCase } from "../editar-imagem-de-perfil.js";

export function makeGetEditarFotoPerfilUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new EditarImagemPerfilUseCase(usersRepository)
}