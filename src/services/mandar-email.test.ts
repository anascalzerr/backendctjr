import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { InMemoryEmailsRepository } from '@/repositories/in-memory/in-memory-emails-repository.js'
import { MandarEmailUseCase } from './mandar-email.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let usersRepository: InMemoryUsersRepository
let emailsRepository: InMemoryEmailsRepository
let sut: MandarEmailUseCase

describe('Mandar Email Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository
        emailsRepository = new InMemoryEmailsRepository()
        sut = new MandarEmailUseCase(emailsRepository, usersRepository)
    })

    it('deve ser possivel mandar um email', async () => {
        const remetente = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        await usersRepository.create({
            nome: 'Juliano Top',
            email: 'julianinhoetop@exemplo.com',
            senha: await hash('123456', 6)
        })

        const { email } = await sut.execute({
            userId: remetente.id,
            emailDestinatario: 'julianinhoetop@exemplo.com',
            title: 'Assunto Desimportante',
            content: 'Tem coisas escritas aqui',
        })

        expect(email.idDeQuemEnviou).toEqual(remetente.id)

    })

    it('deve ser possivel mandar um email', async () => {
        const remetente = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        await expect(sut.execute({
            userId: remetente.id,
            emailDestinatario: 'julianinhoetop@exemplo.com',
            title: 'Assunto Desimportante',
            content: 'Tem coisas escritas aqui',
        })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
    
})