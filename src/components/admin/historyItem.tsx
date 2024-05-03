import { LOCAL_TIME_OPTIONS } from "@/constants"
import { HistoryWithRelations } from "."

type OwnProps = {
    onClick: (history: HistoryWithRelations) => void
    history: HistoryWithRelations
}

export default function HistoryItem({ onClick, history }: OwnProps) {

    const clickHandler = () => {
        onClick(history)
    }

    return (
        <div onClick={clickHandler} className="flex items-center justify-between hover:bg-sky-50 hover:shadow-xl border-b border-b-gray-400 p-2 cursor-pointer">
            <div className="flex items-center justify-between grow">
                <div className="text-sky-700 w-32">{history.client_id}</div>
                <div className="text-sky-700 justify-self-start grow">{history.user.name || history.user.email}</div>
                <div className="text-gray-700">{history.created_at.toLocaleDateString('ru-RU', LOCAL_TIME_OPTIONS)}</div>
            </div>
        </div>
    )
}