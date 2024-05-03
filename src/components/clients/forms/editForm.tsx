import { updateClient } from "@/app/lib/actions"
import { ClientType } from "@/app/utils/readcsv"
import { CLIENT_KEY_MAP } from "@/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"

type OwnProps = {
    client: ClientType
    onCancel: () => void
}

type UserSexType = {
    name: string
    title: string
    isChecked: boolean
    value: string
}

export default function EditForm({ client, onCancel }: OwnProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const checkboxProps = (isChecked: boolean) => {
        return isChecked ? {defaultChecked: true} : {}
    }

    const onSubmit: FormEventHandler = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const entries = Object.fromEntries(formData)
        const newData = !entries?.credit_card ? {...entries, credit_card: '0'} : {...entries, credit_card: '1'}
        const updateStatus = await updateClient(newData as ClientType, client.user_id)
        
        if (updateStatus) {
            const params = new URLSearchParams(searchParams)
            params.delete("mode")
            const path = params.size ? `/clients?${params.toString()}` : '/clients'
            router.push(path)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="w-full p-3 text-sm">
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 italic text-gray-300">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.user_id}</span>
                    <span>{client.user_id}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 italic text-gray-300">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.balance}</span>
                    <span>{client.balance || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 italic text-gray-300">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.city}</span>
                    <span>{client.city}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 italic text-gray-300">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.gender}</span>
                    <span>{client.gender}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.phone_number}</span>
                    <input type="text" name="phone_number" defaultValue={client.phone_number} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_card}</span>
                    <input type="checkbox" name="credit_card" {...checkboxProps(client.credit_card === '1')} className="border-gray-400 w-4 h-4 rounded" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_score}</span>
                    <input type="text" name="credit_score" defaultValue={client.credit_score} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.age}</span>
                    <input type="text" name="age" defaultValue={client.age} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.tenure}</span>
                    <input type="text" name="tenure" defaultValue={client.tenure} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.products}</span>
                    <input type="text" name="products" defaultValue={client.products} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.is_active_member}</span>
                    <select name="is_active_member" defaultValue={client.is_active_member} className="p-0.5 px-2 pr-12 border-gray-400 rounded text-gray-500 w-64">
                        <option>---</option>
                        <option value={'1'}>Да за последние 30 дней</option>
                        <option value={'0'}>Нет за последние 30 дней</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.salary}</span>
                    <input type="text" name="salary" defaultValue={client.salary} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.churn}</span>
                    <select name="churn" defaultValue={client.churn} className="p-0.5 px-2 pr-12 border-gray-400 rounded text-gray-500 w-64">
                        <option>---</option>
                        <option value={'1'}>Ушел</option>
                        <option value={'0'}>Не ушел</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.predictions}</span>
                    <input type="text" name="predictions" defaultValue={client.predictions} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.propensity_to_churn}</span>
                    <input type="text" name="propensity_to_churn" defaultValue={client.propensity_to_churn} className="w-64 p-0.5 px-2 border-gray-400 rounded text-gray-500" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.ranking}</span>
                    <input type="text" name="ranking" defaultValue={client.ranking} className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
            </div>
            <div className="flex items-center justify-between border-t border-t-black p-2">
                <input type="button" onClick={onCancel} className="p-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300" value="Отменить" />
                <input type="submit" className="p-2 border rounded-md bg-sky-600 text-white hover:bg-sky-500" value="Сохранить" />
            </div>
        </form>
    )
}