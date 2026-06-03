import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6),
        },
    })
    
    const authResponse = await request(app.server).post('/login').send({
        email: 'fulanodetal@exemplo.com',
        senha: '123456',
    })

    const { token } = authResponse.body

    return {
        token,
    }
}