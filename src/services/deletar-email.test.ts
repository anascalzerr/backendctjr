import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '@/repositories/in-memory/in-memory-emails-repository.js'
import { DeletarEmailUseCase } from './deletar-email.js'
import { NaoAutorizadoError } from './errors/nao-autorizado-error.js'

let emailsRepository: InMemoryEmailsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeletarEmailUseCase

describe('Deletar Email Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        emailsRepository = new InMemoryEmailsRepository()
        sut = new DeletarEmailUseCase(emailsRepository)
    })
    it('deve ser possivel deletar um email', async () => {
        const user = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const emailEnviado = await emailsRepository.create({
            title: 'Assunto importante',
            content: 'Quero tratar de um assunto importante aqui',
            idDeQuemEnviou: user.id,
            idDeQuemRecebeu: 'fulaninho-id',
        })

        await sut.execute({
            emailId: emailEnviado.id,
            userId: user.id,
        })

        expect(await emailsRepository.findById(emailEnviado.id)).toBeNull()
        
    })

    it('nao deve ser possivel deletar um email ja visto', async () => {
        const user = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const emailEnviado = await emailsRepository.create({
            title: 'Assunto importante',
            content: 'Quero tratar de um assunto importante aqui',
            idDeQuemEnviou: user.id,
            idDeQuemRecebeu: 'fulaninho-id',
            jaVisto: true,
        })

        await expect(sut.execute({
            emailId: emailEnviado.id,
            userId: user.id,
        })).rejects.toBeInstanceOf(NaoAutorizadoError)
        
    })

    it('nao deve ser possivel deletar um email de outro usuario', async () => {
        const user = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const emailEnviado = await emailsRepository.create({
            title: 'Assunto importante',
            content: 'Quero tratar de um assunto importante aqui',
            idDeQuemEnviou: 'michael-jackson',
            idDeQuemRecebeu: 'fulaninho-id',
        })

        await expect(sut.execute({
            emailId: emailEnviado.id,
            userId: user.id,
        })).rejects.toBeInstanceOf(NaoAutorizadoError)
        
    })

})