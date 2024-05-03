'use client'

import { ClientType } from "@/app/utils/readcsv";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import ClientInfo from "./clientInfo";
import EditForm from "./forms/editForm";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteClient } from "@/app/lib/actions";

type OwnProps = {
    client: ClientType
}

export default function SingleClient({ client }: OwnProps) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (searchParams.has('mode') && searchParams.get('mode') === 'edit') {
            setIsEditMode(true)
        } else {
            setIsEditMode(false)
        }
    }, [searchParams])

    const editModeHandler = useCallback(() => {
        setIsEditMode(true)
    }, [])

    const onCancel = () => {
        setIsEditMode(false)
    }

    const onDelete = useCallback(async (id: number) => {
        await deleteClient(id)
        router.replace("/clients")
    }, [])

    return (
        <div className="flex justify-between flex-col items-stretch w-full bg-gray-50 m-auto h-full grow">
            {!isEditMode && <ClientInfo client={client} onClick={editModeHandler} onDelete={onDelete} />}
            {isEditMode && <EditForm onCancel={onCancel} client={client} />}
        </div>
    )
}