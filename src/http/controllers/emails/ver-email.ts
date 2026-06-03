import { EmailNaoEncontradoError } from "@/services/errors/email-nao-encontrado-error.js";
import { NaoAutorizadoError } from "@/services/errors/nao-autorizado-error.js";
import { makeGetVerEmailUseCase } from "@/services/factories/fazer-caso-de-uso-ver-email.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function verEmail(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const userId = request.user.sub

    const GetVerEmailUseCase = makeGetVerEmailUseCase()

    try {
        const { email } = await GetVerEmailUseCase.execute({
            emailId: id,
            userId,
        })

        return reply.status(200).send({
            email,
        })
    } catch(err) {
        if(err instanceof NaoAutorizadoError) {
            return reply.status(401).send({
                message: err.message,
            })
        }

        if(err instanceof EmailNaoEncontradoError) {
            return reply.status(400).send({
                message: err.message,
            })
        }

        throw err
    }

}