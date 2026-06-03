import type { Email, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { EmailsRepository } from "../emails-repository.js";

export class InMemoryEmailsRepository implements EmailsRepository {
    public items: Email[] = []

    async findById(id: string) {
        const email = this.items.find((item) => item.id == id)

        return email ?? null
    }

    async findByDestinatario(idDeQuemRecebeu: string) {
        return this.items.filter(item => item.idDeQuemRecebeu == idDeQuemRecebeu)
    }

    async findManyByRemetente(userId: string) {
        return this.items
            .filter((email) => email.idDeQuemEnviou == userId)
            .sort((a, b) => b.data.getTime() - a.data.getTime())
    }

    async delete(id: string) {
        this.items = this.items.filter(item => item.id !== id)
    }

    async create(data: Prisma.EmailCreateInput& { data?: Date }) {
        const email = {
            id: randomUUID(),
            title: data.title,
            data: data.data ?? new Date(),
            content: data.content,
            jaVisto: data.jaVisto ?? false,
            idDeQuemEnviou: data.idDeQuemEnviou as string,
            idDeQuemRecebeu: data.idDeQuemRecebeu as string
        }

        this.items.push(email)

        return email
    }

}