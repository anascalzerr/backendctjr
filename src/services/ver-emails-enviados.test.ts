import { InMemoryEmailsRepository } from "@/repositories/in-memory/in-memory-emails-repository.js";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetEmailsEnviadosUseCase } from "./ver-emails-enviados.js";

let userRepository: InMemoryUsersRepository
let emailsRepository: InMemoryEmailsRepository
let sut: GetEmailsEnviadosUseCase

describe('Get Emails Enviados Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository()
        emailsRepository = new InMemoryEmailsRepository()
        sut = new GetEmailsEnviadosUseCase(emailsRepository, userRepository)
    })

    it('deve ser possivel ver os emails enviados pelo usuario em ordem recenteA', async () => {
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
            data: new Date("2019-05-13"),
        })

        await emailsRepository.create({
            title: 'Execucao do frontend pro josue',
            content: 'tem tudo aqui dentro!',
            idDeQuemEnviou: remetente.id,
            idDeQuemRecebeu: destinatario.id,
            data: new Date("2019-05-14"),
        })

        await emailsRepository.create({
            title: 'Execucao do nada pro josue',
            content: 'tem tudo aqui dentro!',
            idDeQuemEnviou: destinatario.id,
            idDeQuemRecebeu: remetente.id,
            data: new Date("2019-05-15"),
        }) // enviado por outra pessoa

        const { emails } = await sut.execute({
            userId: remetente.id,
        })
        
        expect(emails).toEqual([
            expect.objectContaining({
                titulo: 'Execucao do frontend pro josue',
                enviado_por: 'Fulano de tal',
                jaVisto: false,
            }),
            expect.objectContaining({
                titulo: 'Execucao do backend pro josue',
                enviado_por: 'Fulano de tal',
                jaVisto: false,
            }),
        ])
    })
})