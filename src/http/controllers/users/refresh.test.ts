import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it('deve ser possivel dar refresh num token', async () => {
        await request(app.server).post('/user').send({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })
        
        const authResponse = await request(app.server).post('/login').send({
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
        })

        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies!)
            .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String),
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken='),
        ])
    })
})