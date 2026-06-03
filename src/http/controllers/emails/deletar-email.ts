import { EmailNaoEncontradoError } from "@/services/errors/email-nao-encontrado-error.js";
import { NaoAutorizadoError } from "@/services/errors/nao-autorizado-error.js";
import { makeGetDeletarEmaillUseCase } from "@/services/factories/fazer-caso-de-uso-deletar-email.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getDeletarEmail(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const userId = request.user.sub

    const DeletarEmailUseCase = makeGetDeletarEmaillUseCase()

    try {
        await DeletarEmailUseCase.execute({
            emailId: id,
            userId,
        })
    } catch (err) {
        if(err instanceof EmailNaoEncontradoError) {
            return reply.status(404).send({ message: err.message })
        }

        if(err instanceof NaoAutorizadoError) {
            return reply.status(401).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}