import request from 'supertest'
import { app } from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Imagem Perfil (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    
    it('deve ser possivel editar a foto de perfil', async () => {
        await request(app.server).post('/user').send({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })
        
        const authenticateResponse = await request(app.server).post('/login').send({
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
        })

        const { token } = authenticateResponse.body

        const response = await request(app.server)
            .patch('/my-image')
            .set('Authorization', `Bearer ${token}`)
            .send( { fotoDePerfil: 'https://alguma-url.com/foto.png'} )
        
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            user: expect.objectContaining({
                fotoDePerfil: expect.any(String),
            })
        })
    })
})