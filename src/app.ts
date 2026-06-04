import fastify from "fastify"
import fastifyCookie from '@fastify/cookie'
import { ZodError } from "zod"
import { env } from "./env/index.js"
import fastifyJwt from "@fastify/jwt"
import { usersRoutes } from "./http/controllers/users/routes.js"
import { emailsRoutes } from "./http/controllers/emails/routes.js"
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
})

app.register(fastifyJwt, {
    secret: 'env.JWT_SECRET',
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '2h',
    }
})

app.register(fastifyCookie)
app.register(usersRoutes)
app.register(emailsRoutes)

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError) {
        return reply
        .status(400)
        .send({ message: 'Erro de validacao.', issues: error.format() })
    } else {
        
    }

    if (env.NODE_ENV != 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})