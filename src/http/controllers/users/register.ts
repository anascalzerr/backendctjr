import { type FastifyRequest, type FastifyReply} from 'fastify'
import z from "zod"
import { UserAlreadyExistsError } from '@/services/errors/user-ja-tem-email.js'
import { makeRegisterUseCase } from '@/services/factories/fazer-caso-de-uso-registro.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        confirmarSenha: z.string().min(6),
    })

    const { nome, email, senha, confirmarSenha } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()
        
        await registerUseCase.execute({
            nome,
            email,
            senha,
            confirmarSenha,
        })
    } catch (err) {
        if(err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}