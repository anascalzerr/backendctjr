import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Meus Emails (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('deve ser possivel mandar um email', async () => {
        await request(app.server).post('/user').send({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })

        await request(app.server).post('/user').send({
            nome: 'Juliano Top',
            email: 'julianinhoetop@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })

        const authResponse = (await request(app.server).post('/login').send({
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
        }))

        const { token } = authResponse.body

        const mandarEmailResponse = await request(app.server)
            .post('/email')
            .set('Authorization', `Bearer ${token}`)
            .send({
                emailDestinatario: 'julianinhoetop@exemplo.com',
                title: 'Assunto Desimportante',
                content: 'Tem coisas escritas aqui'
            })

        expect(mandarEmailResponse.statusCode).toEqual(201)
    })
})