import { PrismaEmailsRepository } from "@/repositories/prisma/prisma-emails-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { MandarEmailUseCase } from "../mandar-email.js";

export function makeGetMandarEmailUseCase() {
    const emailsRepository = new PrismaEmailsRepository()
    const usersRepository = new PrismaUsersRepository()
    return new MandarEmailUseCase(emailsRepository, usersRepository)
}