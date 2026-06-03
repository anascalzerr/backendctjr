import { PrismaEmailsRepository } from "@/repositories/prisma/prisma-emails-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { GetEmailsEnviadosUseCase } from "../ver-emails-enviados.js";

export function makeGetEmailsEnviadosUseCase() {
    const emailsRepository = new PrismaEmailsRepository()
    const usersRepository = new PrismaUsersRepository()
    return new GetEmailsEnviadosUseCase(emailsRepository, usersRepository)
}