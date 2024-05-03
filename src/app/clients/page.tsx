import Clients from '@/components/clients'
import { ClientType } from '../utils/readcsv'
import { getClients } from '@/dbscripts/clients'

type OwnProps = {
    searchParams: {
        page?: number
        query?: string
        orderby?: string
        ordering?: 'asc' | 'desc'
    }
}

export default async function ClientsListPage({searchParams}: OwnProps) {
    const { page = 1, query, orderby, ordering = 'desc' } = searchParams
    const { clients, clientsCount } = await getClients({page, query, orderby, ordering})
    return <Clients clients={clients as ClientType[]} count={clientsCount} />
}