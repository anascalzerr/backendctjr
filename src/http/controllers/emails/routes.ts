import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { getMeusEmails } from "./meus-emails.js";
import { getDeletarEmail } from "./deletar-email.js";
import { mandarEmail } from "./mandar-email.js";
import { getEmailsEnviados } from "./emails-enviados.js";

export async function emailsRoutes(app: FastifyInstance) {
    app.get('/my-emails', { onRequest: [verifyJWT] }, getMeusEmails)
    app.get('/sent-emails', { onRequest: [verifyJWT] }, getEmailsEnviados)

    app.delete('/email/:id', { onRequest: [verifyJWT] }, getDeletarEmail)

    app.post('/email', { onRequest: [verifyJWT] }, mandarEmail)

}