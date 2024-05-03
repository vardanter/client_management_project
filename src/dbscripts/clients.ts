import { ClientType } from "@/app/utils/readcsv"
import { prisma } from "./utils"
import { ITEMS_PER_PAGE } from "@/constants"

type ClientsOptionsType = {
    page?: number
    orderby?: string
    ordering?: 'asc' | 'desc'
    query?: string
}

type GetClientsType = {
    clients: ClientType[]
    clientsCount: number
}

type User = {
    id: number
    username?: string
    email?: string
}

export async function getClients({page = 1, query, orderby, ordering = 'desc'}: ClientsOptionsType): Promise<GetClientsType> {
    try {
        const findParams: {
            skip?: number
            take?: number
            where?: any
            orderBy?: any
        } = {
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE
        }
        if (query) {
            findParams.where = {
                user_id_string: {
                    contains: query
                }
            }
        }
        if (orderby) {
            findParams.orderBy = {
                [orderby]: ordering
            }
        } else {
            findParams.orderBy = {
                user_id: ordering
            }
        }
        const clients = await prisma.client.findMany(findParams) 
        const clientsCount = await prisma.client.count({
            where: findParams?.where
        })
        
        await prisma.$disconnect()
        return {clients: clients as ClientType[], clientsCount}
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }
    return {clients: [], clientsCount: 0}
}

export async function getClient(id: string): Promise<ClientType | unknown> {
    try {
        const client = await prisma.client.findUniqueOrThrow({
            where: {
                user_id: parseInt(id)
            }
        }) 
        
        await prisma.$disconnect()
        return client
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }
    return null
}

export async function updateClient(id: number, newData: ClientType, email: string): Promise<ClientType | unknown> {
    try {
        const currentUser = await prisma.user.findUniqueOrThrow({
            select: {
                id: true
            },
            where: {email: email}
        })
        const currentClient = await prisma.client.findFirst({
            where: {
                user_id: id
            }
        })
        const updatedClient = await prisma.client.update({
            data: newData,
            where: {
                user_id: id
            }
        }) 

        const beforeState = JSON.stringify(currentClient)
        const currentState = JSON.stringify(updatedClient)

        await prisma.history.create({
            data: {
                user_id: currentUser.id,
                client_id: id,
                before_state: beforeState,
                current_state: currentState
            }
        })
        
        await prisma.$disconnect()
        return updatedClient
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }
    return null
}

export async function createClient(newData: ClientType): Promise<ClientType | unknown> {
    try {
        const client = await prisma.client.create({data: newData}) 
        const updatedClient = await prisma.client.update({
            data: {
                user_id_string: `${client.user_id}`
            },
            where: {
                user_id: client.user_id
            }
        })
        
        await prisma.$disconnect()
        return client
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }
    return null
}

export async function deleteClient(id: number): Promise<ClientType | unknown> {
    try {
        const client = await prisma.client.delete({
            where: {
                user_id: id
            }
        })
        
        await prisma.$disconnect()
        return true
    } catch (e) {
        console.error(e)
        await prisma.$disconnect()
    }
    return null
}

