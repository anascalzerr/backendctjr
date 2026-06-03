import type { User, Prisma } from "@prisma/client";
import type { UsersRepository } from "../users-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async findById(id: string) {
        const user = this.items.find(item => item.id == id)

        if (!user) {
            return null
        }

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email == email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            fotoDePerfil: data.fotoDePerfil ?? null,
        }

        this.items.push(user)

        return user
    }

    async save(user: User) {
        const posicao = this.items.findIndex(item => item.id == user.id)
        if (posicao >= 0) {
            this.items[posicao] = user
        }

        return user
    }
}
