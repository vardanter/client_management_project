import SingleClient from "@/components/clients/singleClient";
import { getClient } from "@/dbscripts/clients";
import { ClientType } from "@/app/utils/readcsv";
import ClientModal from "@/components/modal/ClientModal";
import { ClientsProps } from "@/app/clients/[id]/page";


export default async function ClientModalPage({ params }: ClientsProps) {
    const data = await getClient(params.id)
    return (
        <ClientModal>
            <SingleClient client={data as ClientType} />
        </ClientModal>
    )
}