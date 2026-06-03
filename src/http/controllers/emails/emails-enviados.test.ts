import { app } from "@/app.js";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Emails Enviados (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('deve ser possivel ver emails enviados em ordem recente', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server).post('/user').send({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })

        await request(app.server)
        .post('/email')
        .set('Authorization', `Bearer ${token}`)
        .send({
            emailDestinatario: 'fulanodetal@exemplo.com',
            title: 'Assunto Desimportante',
            content: 'Tem coisas escritas aqui'
        })

        const meusEmailsResponse = await request(app.server)
            .get('/sent-emails')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(meusEmailsResponse.statusCode).toEqual(200)
        expect(meusEmailsResponse.body.emails).toEqual([
            expect.objectContaining({
                titulo: 'Assunto Desimportante',
            })
        ])
    })
})