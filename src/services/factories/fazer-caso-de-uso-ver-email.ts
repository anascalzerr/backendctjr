import { PrismaEmailsRepository } from "@/repositories/prisma/prisma-emails-repository.js";
import { GetVerEmailUseCase } from "../ver-email.js";

export function makeGetVerEmailUseCase() {
    const emailsRepository = new PrismaEmailsRepository()
    return new GetVerEmailUseCase(emailsRepository)
}