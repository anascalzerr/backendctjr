import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { EditarNomeUseCase } from './editar-nome.js'

let usersRepository: InMemoryUsersRepository
let sut: EditarNomeUseCase

describe('Editar Nome Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new EditarNomeUseCase(usersRepository)
    })
    it('deve ser possivel editar nome', async () => {
        const userNovo = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: userNovo.id,
            nome: 'Fulaninho de Talzeiro',
        })

        expect(user.nome).toEqual('Fulaninho de Talzeiro')
    })

})