import { prisma } from "@/lib/prisma.js"
import { Prisma } from '@prisma/client'
import type { EmailsRepository } from "../emails-repository.js"

export class PrismaEmailsRepository implements EmailsRepository {
    async findById(id: string) {
        const email = await prisma.email.findUnique({
            where: {
                id,
            }
        })

        return email
    }
    async findByDestinatario(idDeQuemRecebeu: string) {
        const emails = await prisma.email.findMany({
            where: { idDeQuemRecebeu },
            orderBy: { data: 'desc'}
        })

        return emails
    }

    async delete(id: string) {
        await prisma.email.delete({
            where: { id }
        })
    }
    
    async create(data: Prisma.EmailCreateInput) {
        const email = await prisma.email.create({
        data,
    })


    return email
    }
}