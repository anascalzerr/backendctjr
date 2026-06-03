import { EmailNaoEncontradoError } from "@/services/errors/email-nao-encontrado-error.js";
import { makeGetMandarEmailUseCase } from "@/services/factories/fazer-caso-de-uso-de-mandar-email.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function mandarEmail(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            emailDestinatario: z.string(),
            title: z.string(),
            content: z.string(),
        })
    
        const { emailDestinatario, title, content } = bodySchema.parse(request.body)
        const userId = request.user.sub

        const MandarEmailUseCase = makeGetMandarEmailUseCase()
    
        try {
            await MandarEmailUseCase.execute({
                userId,
                emailDestinatario,
                title,
                content,
            })
        } catch (err) {
            if(err instanceof EmailNaoEncontradoError) { // nao existe usuario com esse email para destinatario
                return reply.status(404).send({ message: err.message })
            }

            throw err
        }

        return reply.status(201).send()
    }