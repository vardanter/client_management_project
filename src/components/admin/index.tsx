'use client'

import type { Client, History, User } from "@prisma/client"
import { useCallback, useState } from "react"
import HistoryItem from "./historyItem"
import Modal from "../modal"
import { CLIENT_KEY_MAP, ClientMapType } from "@/constants"
import Link from "next/link"

export type HistoryWithRelations = History & {
    user: User
    client: Client
}

type OwnProps = {
    historyData: HistoryWithRelations[] | undefined
}

type DiffType = {
    key: {
        before: string
        after: string
    }
}

const getNormalValue = (key: string, value: string): string => {
    let newValue

    switch(key) {
        case 'credit_card':
            newValue = value === '1' ? 'Да' : 'Нет'
            break
        case 'is_active_member':
            newValue = value === '1' ? 'Да за последние 30 дней' : 'Нет за последние 30 дней'
            break
        case 'churn':
            newValue = value === '1' ? 'Ушел' : 'Не ушел'
            break
        default:
            newValue = value
    }
    if (!newValue) {
        return '__'
    }
    return newValue
}

export default function Admin({ historyData }: OwnProps) {
    const [historyDiff, setHistoryDiff] = useState<DiffType>()
    const [selectedHistory, setSelectedHistory] = useState<HistoryWithRelations>()
    const [showModal, setShowModal] = useState<boolean>(false)

    const onClick = useCallback((history: HistoryWithRelations) => {
        const beforeState = JSON.parse(history.before_state as string)
        const currentState = JSON.parse(history.current_state as string)
        let diff: any = {}
        const dontAllowedKeys = ['user', 'client']

        Object.keys(beforeState).forEach((key: string) => {
            if (!dontAllowedKeys.includes(key)) {
                if (beforeState[key] !== currentState[key]) {
                    if (!diff[key]) diff[key] = {}
                    diff[key].before = beforeState[key]
                    diff[key].after = currentState[key]
                }
            }
        })
        setHistoryDiff(diff)
        setSelectedHistory(history)
        setShowModal(true)
    }, [])

    const closeModalHandler = () => {
        setShowModal(false)
    }
    
    if (!historyData) {
        return (
            <div className="flex items-center">История отсутствует</div>
        )
    }
    // @ts-ignore
    return (
        <div>
            {historyData.map((history: HistoryWithRelations) => {
                return <HistoryItem key={history.id} onClick={onClick} history={history} />
            })}
            {showModal && (
                <Modal onClose={closeModalHandler}>
                    <div className="flex items-stretch justify-center grow bg-white text-sm">
                        <div className="w-3/5 border-r p-2">
                            <div className="flex justify-center p-2 font-bold">До</div>
                            {historyDiff && Object.keys(historyDiff).map((key: string) => {
                                return (
                                    <div key={key} className="flex items-center justify-between border-b">
                                        <span className="">{CLIENT_KEY_MAP[key as keyof ClientMapType]}</span>
                                        <span>{getNormalValue(key, historyDiff[key as keyof DiffType].before)}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-2/5 border-r p-2">
                            <div className="flex justify-center p-2 font-bold">После</div>
                            {historyDiff && Object.keys(historyDiff).map((key: string) => {
                                return (
                                    <div key={key} className="flex items-center justify-end border-b">
                                        <span>{getNormalValue(key, historyDiff[key as keyof DiffType].after)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="text-gray-400 flex flex-col items-end pt-2 text-sm">
                        <div>
                            <span>Данные клиента(</span>
                            <Link href={`/clients/${selectedHistory?.client_id}`} target="_blank" className="text-red-300 hover:text-cyan-300">
                                {selectedHistory?.client_id}
                            </Link>    
                            <span>) были изменены пользователем </span>
                            <span className="text-white">{selectedHistory?.user.email} </span>
                        </div>
                        <div>Дата изменений - {selectedHistory?.created_at.toLocaleDateString('ru-RU')}</div>
                    </div>
                </Modal>
            )}
        </div>
    )
}


