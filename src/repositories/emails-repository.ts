import type { Email, Prisma } from "@prisma/client";

export interface EmailsRepository {
    create(data: Prisma.EmailCreateInput): Promise<Email>
    findManyByRemetente(userId: string): Promise<Email[]>
    findByDestinatario(idDeQuemRecebeu: string): Promise<Email[]>
    findById(id: string): Promise<Email | null>
    delete(id: string): Promise<void>
}