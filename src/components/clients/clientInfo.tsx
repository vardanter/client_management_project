import { ClientType } from "@/app/utils/readcsv"
import { CLIENT_KEY_MAP } from "@/constants"
import { MouseEventHandler } from "react"

type OwnProps = {
    client: ClientType
    onClick: () => void
    onDelete: (id: number) => void
}

export default function ClientInfo({ client, onClick, onDelete }: OwnProps) {
    return (
        <>
            <div className="w-full p-3 text-sm">
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.user_id}</span>
                    <span>{client.user_id}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.phone_number}</span>
                    <span>{client.phone_number || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.balance}</span>
                    <span>{client.balance || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_card}</span>
                    <span>{client.credit_card === '1' ? 'Да' : 'Нет'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_score}</span>
                    <span>{client.credit_score || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.age}</span>
                    <span>{client.age || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.tenure}</span>
                    <span>{client.tenure || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.products}</span>
                    <span>{client.products || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.is_active_member}</span>
                    <span>{client.is_active_member === '1' ? 'Да за последние 30 дней' : 'Нет за последние 30 дней'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.salary}</span>
                    <span>{client.salary || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.churn}</span>
                    <span>{client.churn === '1' ? 'Ушел' : 'Не ушел'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.city}</span>
                    <span>{client.city}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.gender}</span>
                    <span>{client.gender}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.predictions}</span>
                    <span>{client.predictions || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.propensity_to_churn}</span>
                    <span>{client.propensity_to_churn || '__'}</span>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.ranking}</span>
                    <span>{client.ranking || '__'}</span>
                </div>
            </div>
            <div className="flex items-center justify-end border-t border-t-black p-2">
                <div onClick={() => onDelete(client.user_id)} className="p-2 border rounded-md bg-red-600 text-white hover:bg-red-500 cursor-pointer">
                    Удалить
                </div>
                <div onClick={onClick} className="p-2 border rounded-md bg-sky-600 text-white hover:bg-sky-500 cursor-pointer">
                    Редактировать
                </div>
            </div>
        </>
    )
}