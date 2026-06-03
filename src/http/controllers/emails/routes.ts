import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { getMeusEmails } from "./meus-emails.js";

export async function emailsRoutes(app: FastifyInstance) {
    app.get('/my-emails', { onRequest: [verifyJWT] }, getMeusEmails)
}