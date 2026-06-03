import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })
    it('deve ser possivel criar perfil de usuario', async () => {
        const createdUser = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.nome).toEqual('Fulano de tal')

    })

    it('nao deve ser possivel criar perfil de usuario com id errado', async () => {
        await expect(() => 
            sut.execute({
                userId: 'ID-inexistente',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})