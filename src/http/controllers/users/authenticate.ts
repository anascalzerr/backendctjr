import { type FastifyRequest, type FastifyReply} from 'fastify'
import z from "zod"
import { CredencialInvalidaError } from '@/services/errors/credencial-invalida-error.js'
import { makeAuthenticateUseCase } from '@/services/factories/fazer-caso-de-uso-de-autenticacao.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        senha: z.string().min(6),
    })

    const { email, senha } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            email,
            senha,
        })

        const token = await reply.jwtSign(
            {},
            {
            sign: {
                sub: user.id,
            }
        })

        const refreshToken = await reply.jwtSign(
            {
            sign: {
                sub: user.id,
                expiresIn: '2h',
            }
        })

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                token,
            })
    } catch (err) {
        if(err instanceof CredencialInvalidaError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

}