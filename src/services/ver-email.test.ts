import { InMemoryEmailsRepository } from "@/repositories/in-memory/in-memory-emails-repository.js";
import { beforeEach, describe, expect, it } from "vitest";
import { GetVerEmailUseCase } from "./ver-email.js";

let emailsRepository: InMemoryEmailsRepository
let sut: GetVerEmailUseCase

describe('Get Meus Emails Use Case', () => {
    beforeEach(() => {
        emailsRepository = new InMemoryEmailsRepository()
        sut = new GetVerEmailUseCase(emailsRepository)
    })

    it('deve ser possivel ver um email', async () => {
        const emailCriado = await emailsRepository.create({
            title: 'Execucao do backend pro josue',
            content: 'nao tem nada aqui dentro!',
            idDeQuemEnviou: 'Fulano de tal',
            idDeQuemRecebeu: 'Josue da Silva',
        
        })

        const { email } = await sut.execute({
            emailId: emailCriado.id,
            userId: 'Josue da Silva',
        })
        
        expect(email.id).toEqual(emailCriado.id)
        expect(email.title).toEqual('Execucao do backend pro josue')
        expect(email.idDeQuemEnviou).toEqual('Fulano de tal')
        expect(email.idDeQuemRecebeu).toEqual('Josue da Silva')
    })

    it('deve ser possivel marcar um email como visto quando for aberto', async () => {
        const emailCriado = await emailsRepository.create({
            title: 'Execucao do backend pro josue',
            content: 'nao tem nada aqui dentro!',
            idDeQuemEnviou: 'Fulano de tal',
            idDeQuemRecebeu: 'Josue da Silva',
            jaVisto: false,
        
        })

        await sut.execute({
            emailId: emailCriado.id,
            userId: 'Josue da Silva',
        })

        const emailSalvo = await emailsRepository.findById(emailCriado.id)

        expect(emailSalvo?.jaVisto).toEqual(true)
    })

    it('nao deve ser possivel marcar um email como visto se for aberto pelo remetente', async () => {
        const emailCriado = await emailsRepository.create({
            title: 'Execucao do backend pro josue',
            content: 'nao tem nada aqui dentro!',
            idDeQuemEnviou: 'Fulano de tal',
            idDeQuemRecebeu: 'Josue da Silva',
            jaVisto: false,
        
        })

        await sut.execute({
            emailId: emailCriado.id,
            userId: 'Fulano de tal',
        })

        const emailSalvo = await emailsRepository.findById(emailCriado.id)

        expect(emailSalvo?.jaVisto).toEqual(false)
    })

})