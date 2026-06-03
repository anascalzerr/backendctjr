import { makeEditarNomeUseCase } from '@/services/factories/fazer-caso-de-uso-editar-nome.js'
import { type FastifyRequest, type FastifyReply} from 'fastify'
import z from 'zod'

export async function editarNome(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        nome: z.string(),
    })

    const { nome } = bodySchema.parse(request.body)

    const getEditarNomeUseCase = makeEditarNomeUseCase()

    const { user } = await getEditarNomeUseCase.execute({
        userId: request.user.sub,
        nome,
    })

    return reply.status(200).send({
        user: {
            ...user,
            senha: undefined,
        },
    })
}