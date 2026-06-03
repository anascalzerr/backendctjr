import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-ja-tem-email.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('o usuario deve conseguir se cadastrar', async () => {
        const { user } = await sut.execute({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('a senha do usuario deve ser hash assim que ele se cadastrar', async () => {
        const { user } = await sut.execute({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: '123456',
            confirmarSenha: '123456',
        })

        const SenhaCorretamenteHashed = await compare(
            '123456',
            user.senha,
        )

        expect(SenhaCorretamenteHashed).toBe(true)
    })

    it('nao pode se cadastrar com o mesmo email duas vezes', async () => {
        const email = 'fulanodetal@exemplo.com'

        await sut.execute({
            nome: 'Fulano de tal',
            email,
            senha: '123456',
            confirmarSenha: '123456',
        })

        await expect(() => 
            sut.execute({
                nome: 'Fulano de tal',
                email,
                senha: '123456',
                confirmarSenha: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})