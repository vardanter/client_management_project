import { ClientType } from "@/app/utils/readcsv"
import { prisma } from "./utils"

export async function csvState(): Promise<boolean> {
    try {
        const state = await prisma.csvstatus.findFirst({
            where: {
              is_active: true,
            },
        }) 
        
        await prisma.$disconnect()
        return state ? true : false
    } catch (e) {
        console.error(e)
    }
    return false
}

export async function csvStateInsert(): Promise<boolean> {
    try {
        await prisma.csvstatus.create({
            data: {
                is_active: true
            }
        })
        
        await prisma.$disconnect()
        return true
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
    return false
}

export async function addClients(clients: ClientType[]): Promise<boolean> {
    try {
        for (const client of clients ) {
            if (typeof client === 'string') {
                continue
            }
            try {
                await prisma.client.create({
                    data: client
                })
            } catch (e) {
                console.error(e)
            }
        }        
        
        await prisma.$disconnect()
        return true
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
    return false
}

export async function truncateCsv(): Promise<boolean> {
    try {
        await prisma.$executeRawUnsafe(`DELETE FROM Csvstatus;`)
        await prisma.$executeRawUnsafe(`DELETE FROM Client;`)
        await prisma.$disconnect()
        return true
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    }
    return false
}