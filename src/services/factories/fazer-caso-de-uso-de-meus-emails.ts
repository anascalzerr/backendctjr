import { PrismaEmailsRepository } from "@/repositories/prisma/prisma-emails-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { GetMeusEmailsUseCase } from "../meus-email.js";

export function makeGetMeusEmailsUseCase() {
    const emailsRepository = new PrismaEmailsRepository()
    const usersRepository = new PrismaUsersRepository()
    return new GetMeusEmailsUseCase(emailsRepository, usersRepository)
}