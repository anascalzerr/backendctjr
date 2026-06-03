import { PrismaEmailsRepository } from "@/repositories/prisma/prisma-emails-repository.js";
import { DeletarEmailUseCase } from "../deletar-email.js";

export function makeGetDeletarEmaillUseCase() {
    const emailsRepository = new PrismaEmailsRepository()
    return new DeletarEmailUseCase(emailsRepository)
}