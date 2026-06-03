import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { prisma } from "@/lib/prisma.js";

describe('Deletar Email (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('deve ser possivel deletar um email', async () => {
        await request(app.server).post('/user').send({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })

        const authResponse = (await request(app.server).post('/login').send({
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
        }))
        
        const { token } = authResponse.body

        const userCriado = await prisma.user.findUniqueOrThrow({
            where: {
                email: 'fulanodetal@exemplo.com'
            },
        })

        const emailCriado = await prisma.email.create({
            data: {
                title: 'Assunto Desimportante',
                content: 'Tem coisas escritas aqui',
                idDeQuemEnviou: userCriado.id,
                idDeQuemRecebeu: userCriado.id,
            },
        })

        const deletarEmailResponse = await request(app.server)
            .delete(`/email/${emailCriado.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(deletarEmailResponse.statusCode).toEqual(200)
    })
})