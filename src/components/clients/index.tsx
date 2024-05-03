'use client'

import { CLIENT_KEY_MAP } from "@/constants"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useRouter, useSearchParams } from "next/navigation"
import SearchBar from "../searchBar"
import Pagination from "../pagination"
import { useState } from "react"
import OrderMenu from "./orderMenu"

type OwnProps = {
    clients: typeof CLIENT_KEY_MAP[]
    count?: number
}

const Clients = ({ clients, count = 0 }: OwnProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const onClick = (id: string) => () => {
        const path = searchParams.size > 0 ? `/clients/${id}?${searchParams.toString()}` : `/clients/${id}`
        router.push(path)
    }

    const editModeHandler = (id: string) => () => {
        const params = new URLSearchParams(searchParams)
        params.append("mode", "edit")
        router.push(`/clients/${id}?${params.toString()}`)
    }

    return (
        <div className="w-8/12 m-auto">
            <div className="flex items-center justify-between mb-4">
                <OrderMenu />
                <div className="w-2/4 flex items-center justify-center">
                    <SearchBar />
                </div>
            </div>
            {
                clients.map(client => (
                    <div key={client.user_id} className="flex justify-between items-stretch border border-gray-300 rounded-2xl mb-4 bg-gray-50 h-32">
                        <div key={client.user_id} className="w-2/4 p-3 text-sm">
                            <div className="text-2xl text-cyan-600 cursor-pointer" onClick={onClick(client.user_id)}>{client.user_id}</div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.phone_number}</span>
                                <span>{client.phone_number || 'не указан'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.balance}</span>
                                <span>{client.balance}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_card}</span>
                                <span>{client.credit_card === '1' ? 'Да' : 'Нет'}</span>
                            </div>
                        </div>
                        <div onClick={editModeHandler(client.user_id)} className="w-10 flex items-center justify-center h-full border-l hover:bg-sky-100 transition-all rounded-e-2xl border-l-gray-200 cursor-pointer text-cyan-600">
                            <PencilSquareIcon className="w-6" />
                        </div>
                    </div>
                ))
            }
            <Pagination size={count} />
        </div>
    )
}

export default Clients