import { prisma } from "./utils";

export async function getHistoryList() {
    try {
        const list = await prisma.history.findMany({
            include: {
                user: true,
                client: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        await prisma.$disconnect()
        return list
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }
}