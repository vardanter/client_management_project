'use server'

import { auth } from "@/auth"
import { ClientType } from "../utils/readcsv"
import { 
    updateClient as updateClientDb, 
    createClient as createClientDb, 
    deleteClient as deleteClientDb  
} from "@/dbscripts/clients"

export const updateClient = async (newClient: ClientType, user_id: number) => {
    const session = await auth()
    const updatedClient = await updateClientDb(user_id, newClient, session?.user?.email as string)
    if (updatedClient) {
        return true
    } else {
        return false
    }
}

export const createClient = async (newClient: ClientType) => {
    const updatedClient = await createClientDb(newClient)
    if (updatedClient) {
        return true
    } else {
        return false
    }
}

export const deleteClient = async (id: number) => {
    const deletedClient = await deleteClientDb(id)
    if (deletedClient) {
        return true
    } else {
        return false
    }
}