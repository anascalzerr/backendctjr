import { makeGetMeusEmailsUseCase } from "@/services/factories/fazer-caso-de-uso-de-meus-emails.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getMeusEmails(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const useCase = makeGetMeusEmailsUseCase()
    const { emails } = await useCase.execute({ idDeQuemRecebeu: userId })

    return reply.status(200).send({ emails })
}