import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { EditarImagemPerfilUseCase } from './editar-imagem-de-perfil.js'

let usersRepository: InMemoryUsersRepository
let sut: EditarImagemPerfilUseCase

describe('Editar Imagem de Perfil Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new EditarImagemPerfilUseCase(usersRepository)
    })
    it('deve ser possivel editar nome do usuario', async () => {
        const userNovo = await usersRepository.create({
            nome: 'Fulano de tal',
            email: 'fulanodetal@exemplo.com',
            senha: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: userNovo.id,
            fotoDePerfil: 'https://urlaleatorio.com/iconpfp.jpg',
        })

        expect(user.fotoDePerfil).toEqual('https://urlaleatorio.com/iconpfp.jpg')
    })

})