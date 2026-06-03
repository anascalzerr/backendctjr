import { app } from "@/app.js";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Meus Emails (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('deve ser possivel ver emails recebidos em ordem recente', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const meusEmailsResponse = await request(app.server)
            .get('/my-emails')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(meusEmailsResponse.statusCode).toEqual(200)
        expect(meusEmailsResponse.body.emails).toEqual(expect.arrayContaining([]))
    })
})