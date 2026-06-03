import type { FastifyInstance } from "fastify";
import { register } from "./register.js";
import { authenticate } from "./authenticate.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { refresh } from "./refresh.js";
import { editarImagemDePerfil } from "./editar-imagem-de-perfil.js";
import { editarNome } from "./editar-nome.js";
import { deletarEmail } from "../emails/meus-emails.js";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/user', register)
    app.post('/login', authenticate)

    app.patch('/token/refresh', refresh)
    app.patch('/my-name', { onRequest: [verifyJWT] }, editarNome)
    app.patch('/my-image', { onRequest: [verifyJWT] }, editarImagemDePerfil)

    app.delete('/email/:id', { onRequest: [verifyJWT] }, deletarEmail)
}
