import { NaoAutorizadoError } from "@/services/errors/nao-autorizado-error.js";
import { makeGetEmailsEnviadosUseCase } from "@/services/factories/fazer-caso-de-uso-emails-enviados.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getEmailsEnviados(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    const GetEmailsEnviadosUseCase = makeGetEmailsEnviadosUseCase()

    try {
        const { emails } = await GetEmailsEnviadosUseCase.execute({
            userId,
        })

        return reply.status(200).send({
            emails,
        })
    } catch (err) {
        if(err instanceof NaoAutorizadoError) {
            return reply.status(401).send({ message: err.message })
        }

        throw err
    }
}