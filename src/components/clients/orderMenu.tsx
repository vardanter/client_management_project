import { CLIENT_KEY_MAP, ClientMapType } from "@/constants"
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import Modal from "../modal"
import CreateForm from "./forms/updateForm"

type OrderDirection = 'asc' | 'desc'
const defaultOrderDirection: OrderDirection = 'desc'

export default function OrderMenu() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const [currentDirection, setCurrentDirection] = useState<string>(defaultOrderDirection)
    const [currentOrderBy, setCurrentOrderBy] = useState<string | null>()
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)

    useEffect(() => {
        if (searchParams.has('ordering')) {
            setCurrentDirection(searchParams.get('ordering') || defaultOrderDirection)
        }
        if (searchParams.has('orderby')) {
            setCurrentOrderBy(searchParams.get('orderby'))
        }
    }, [searchParams])
    
    const orderAscendingHandler = () => {
        const params = getUrlParams()
        params.has('ordering') ? params.set('ordering', 'asc') : params.append('ordering', 'asc')
        setCurrentDirection('asc')
        router.replace(`${pathName}?${params.toString()}`)
    }
    
    const orderDescendingHandler = () => {
        const params = getUrlParams()
        params.has('ordering') ? params.set('ordering', 'desc') : params.append('ordering', 'desc')
        setCurrentDirection('desc')
        router.replace(`${pathName}?${params.toString()}`)
    }

    const onChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const orderby = e.currentTarget.value
        const params = getUrlParams()
        if (orderby) {
            params.has('orderby') ? params.set('orderby', orderby) : params.append('orderby', orderby)
            !params.has('ordering') ?? params.set('ordering', defaultOrderDirection)
        } else {
            params.delete('orderby')
            params.delete('ordering')
            setCurrentDirection(defaultOrderDirection)
        }
        router.replace(`${pathName}?${params.toString()}`)
    }

    const createClientHandler = () => {
        setShowCreateModal(true)
    }

    const onModalClose = () => {
        setShowCreateModal(false)
    }

    const getUrlParams = () => {
        return new URLSearchParams(searchParams)
    }

    return (
        <div className="items-self-start grow px-2 flex items-center justify-center">
            <button onClick={createClientHandler} className="w-16 p-[3px] bg-sky-600 rounded-lg border-0 flex items-center justify-center hover:bg-sky-500" title="Добавить нового клиента">
                <PlusIcon className="w-4 h-4 text-orange-50" />
                <UserCircleIcon className="w-8 h-8 text-white cursor-pointer" />
            </button>
            <select name="is_active_member" onChange={onChange} className="mx-2 p-1.5 pr-12 border-gray-400 rounded-lg text-gray-500 w-64 grow">
                <option value="">Сортиривка по идентификатору</option>
                {Object.keys(CLIENT_KEY_MAP).map(
                    (key: string) => {
                        if (key !== 'user_id') {
                            return <option key={key} value={key} selected={currentOrderBy === key}>{CLIENT_KEY_MAP[key as keyof ClientMapType]}</option>
                        }
                    }
                )}
            </select>
            <div className="flex flex-col items-center justify-between h-10">
                {currentDirection !== 'desc' && <ChevronUpIcon className="w-4 h-4 cursor-pointer hover:text-sky-700" onClick={orderDescendingHandler} />}
                {currentDirection === 'desc' && <ChevronDoubleUpIcon className="w-5 h-5 text-sky-700" />}
                {currentDirection !== 'asc' && <ChevronDownIcon className="w-4 h-4 cursor-pointer hover:text-sky-700" onClick={orderAscendingHandler} />}
                {currentDirection === 'asc' && <ChevronDoubleDownIcon className="w-5 h-5 text-sky-700" onClick={orderAscendingHandler} />}
            </div>
            {showCreateModal && <Modal onClose={onModalClose}><CreateForm onSubmit={onModalClose} /></Modal>}
        </div>
    )
}