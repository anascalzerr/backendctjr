import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('deve ser possivel cadastrar-se', async () => {
        const response = await request(app.server)
            .post('/user')
            .send({
                nome: 'Fulano de tal',
                email: 'fulanodetal@exemplo.com',
                senha: '123456',
                confirmarSenha: '123456',
            })
        
        expect(response.statusCode).toEqual(201)
    })
})