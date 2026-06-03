import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { AutenticarUseCase } from './autenticar.js'
import { hash } from 'bcryptjs'
import { CredencialInvalidaError } from './errors/credencial-invalida-error.js'

let usersRepository: InMemoryUsersRepository
let sut: AutenticarUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AutenticarUseCase(usersRepository)
    })
    it('deve ser possivel se autenticar', async () => {
        await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('nao deve ser possivel se autenticar com email errado', async () => {
        await expect(() => 
            sut.execute({
                email: 'fulanodetal@exemplo.com',
                senha: '123456',
        }),
    ).rejects.toBeInstanceOf(CredencialInvalidaError)
    })

    it('nao deve ser possivel se autenticar com senha errado', async () => {
        await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'fulanodetal@exemplo.com',
                senha: '123454',
        }),
    ).rejects.toBeInstanceOf(CredencialInvalidaError)
    })
})