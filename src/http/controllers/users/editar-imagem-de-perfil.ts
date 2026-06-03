import { makeGetEditarFotoPerfilUseCase } from '@/services/factories/fazer-caso-de-uso-editar-imagem-perfil.js'
import { type FastifyRequest, type FastifyReply} from 'fastify'
import z from 'zod'

export async function editarImagemDePerfil(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        fotoDePerfil: z.string(),
    })

    const { fotoDePerfil } = bodySchema.parse(request.body)

    const getEditarFotoDePerfil = makeGetEditarFotoPerfilUseCase()

    const { user } = await getEditarFotoDePerfil.execute({
        userId: request.user.sub,
        fotoDePerfil,
    })

    return reply.status(200).send({
        user: {
            ...user,
            senha: undefined,
        },
    })
}