import { InMemoryEmailsRepository } from "@/repositories/in-memory/in-memory-emails-repository.js";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js";
import { GetMeusEmailsUseCase } from "./meus-email.js";
import { beforeEach, describe, expect, it } from "vitest";

let userRepository: InMemoryUsersRepository
let emailsRepository: InMemoryEmailsRepository
let sut: GetMeusEmailsUseCase

describe('Get Meus Emails Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        emailsRepository = new InMemoryEmailsRepository()
        sut = new GetMeusEmailsUseCase(emailsRepository, userRepository)
    })

    it('deve ser possivel ver os emails recebidos do usuario', async () => {
        const remetente = await userRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
        })

        const destinatario = await userRepository.create({
            nome: 'Josue da Silva',
            email: 'josuedasilva@exemplo.com',
            senha: '123456',
        })
        
        await emailsRepository.create({
            title: 'Execucao do backend pro josue',
            content: 'nao tem nada aqui dentro!',
            idDeQuemEnviou: remetente.id,
            idDeQuemRecebeu: destinatario.id,
        })

        const { emails } = await sut.execute({
            idDeQuemRecebeu: destinatario.id,
        })
        
        expect(emails).toHaveLength(1)
        expect(emails[0]?.titulo).toEqual('Execucao do backend pro josue')
        expect(emails[0]?.enviado_por).toEqual('Fulano de tal')
        expect(emails[0]?.jaVisto).toEqual(false)
    })

    it('deve retornar nada se nao houver emails', async () => {
        const destinatario = await userRepository.create({
            nome: 'Claudia',
            email: 'claudiajulia@exemplo.com',
            senha: '123456',
        })
        
        const { emails } = await sut.execute({
            idDeQuemRecebeu: destinatario.id,
        })

        expect(emails).toHaveLength(0)
    })
})