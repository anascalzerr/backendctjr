import { makeGetMeusEmailsUseCase } from "@/services/factories/fazer-caso-de-uso-de-meus-emails.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function deletarEmail(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const GetMeusEmailsUseCase = makeGetMeusEmailsUseCase()
    const { emails } = await GetMeusEmailsUseCase.execute({ idDeQuemRecebeu: userId })

    return reply.status(200).send({ emails })
}