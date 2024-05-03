import { createClient, updateClient } from "@/app/lib/actions"
import { ClientType } from "@/app/utils/readcsv"
import { CLIENT_KEY_MAP } from "@/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"

type OwnProps = {
    client: ClientType
}

type UserSexType = {
    name: string
    title: string
    isChecked: boolean
    value: string
}

export default function CreateForm({ onSubmit }: {onSubmit: () => void}) {
    const router = useRouter()
    const [isError, setIsError] = useState<boolean>(false)

    const onSubmitHandler: FormEventHandler = async (e: FormEvent) => {
        e.preventDefault()
        setIsError(false)
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const entries = Object.fromEntries(formData)
        const newData = !entries?.credit_card ? {...entries, credit_card: '0'} : {...entries, credit_card: '1'}
        const status = await createClient(newData as ClientType)
        
        if (status) {
            router.push('/clients')
            onSubmit()
        } else {
            setIsError(true)
        }
    }

    const onReset = () => {
        setIsError(true)
    }

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col grow">
            <div className="w-full p-3 text-sm bg-white grow">
                {/* <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 text-gray-500">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.user_id}</span>
                    <input type="text" name="user_id" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div> */}
                {!isError && (
                <>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 text-gray-500">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.balance}</span>
                    <input type="text" name="balance" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 text-gray-500">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.city}</span>
                    <select name="city" className="p-0.5 px-2 pr-12 border-gray-400 rounded text-gray-500 w-64">
                        <option>---</option>
                        <option value="Челябинск">Челябинск</option>
                        <option value="Южноуральск">Южноуральск</option>
                        <option value="Магнитогорск">Магнитогорск</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100 text-gray-500">
                    <span className="font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.gender}</span>
                    <select name="gender" className="p-0.5 px-2 pr-12 border-gray-400 rounded text-gray-500 w-64">
                        <option>---</option>
                        <option value="Мужской">Мужской</option>
                        <option value="Женский">Женский</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.phone_number}</span>
                    <input type="text" name="phone_number" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_card}</span>
                    <input type="checkbox" name="credit_card" className="border-gray-400 w-4 h-4 rounded" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.credit_score}</span>
                    <input type="text" name="credit_score" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.age}</span>
                    <input type="text" name="age" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.tenure}</span>
                    <input type="text" name="tenure" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.products}</span>
                    <input type="text" name="products" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.is_active_member}</span>
                    <select name="is_active_member" className="p-0.5 px-2 pr-12 border-gray-400 rounded text-gray-500 w-64">
                        <option>---</option>
                        <option value={'1'}>Да за последние 30 дней</option>
                        <option value={'0'}>Нет за последние 30 дней</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.salary}</span>
                    <input type="text" name="salary" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.churn}</span>
                    <select name="churn" className="p-0.5 px-2 pr-12 border-gray-400 rounded text-gray-500 w-64">
                        <option>---</option>
                        <option value={'1'}>Ушел</option>
                        <option value={'0'}>Не ушел</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.predictions}</span>
                    <input type="text" name="predictions" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.propensity_to_churn}</span>
                    <input type="text" name="propensity_to_churn" className="w-64 p-0.5 px-2 border-gray-400 rounded text-gray-500" />
                </div>
                <div className="flex items-center justify-between mb-1 border-b border-b-gray-100">
                    <span className="text-gray-500 font-semibold mr-4 after:content-[':']">{CLIENT_KEY_MAP.ranking}</span>
                    <input type="text" name="ranking" className="p-0.5 px-2 border-gray-400 rounded text-gray-500 w-64" />
                </div>
                </>
            )}
                {isError && <div className="text-red-600 flex grow justify-center">Произошла ошибка при сохранении нового пользователя!</div>}
            </div>
            <div className="flex items-center justify-end border-t border-t-black p-2">
                {!isError && <input type="submit" className="p-2 border rounded-md bg-sky-600 text-white hover:bg-sky-500" value="Сохранить" />}
                {isError && <input type="button" onClick={onReset} className="p-2 border rounded-md bg-sky-600 text-white hover:bg-sky-500" value="Попробовать еще раз" />}
            </div>
        </form>
    )
}