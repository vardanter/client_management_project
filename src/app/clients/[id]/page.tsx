import { ClientType } from '@/app/utils/readcsv'
import SingleClient from '@/components/clients/singleClient'
import { getClient } from '@/dbscripts/clients'

export type ClientsProps = {
    params: {
        id: string
    }
}

export default async function ClientsListPage({params}: ClientsProps) {
    const data = await getClient(params.id)
    return (
        <div className="w-3/5 m-auto">
            <SingleClient client={data as ClientType} />
        </div>
    )
}