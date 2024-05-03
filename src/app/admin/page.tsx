import { auth } from "@/auth"
import Admin from "@/components/admin"
import { getHistoryList } from "@/dbscripts/history"
import { isAllowedAdmin } from "@/dbscripts/users"
import { notFound } from "next/navigation"

export default async function AdminDashboard() {
    const session = await auth()
    const allowed = session ? await isAllowedAdmin(session.user?.email as string) : false

    if (!allowed) {
        return notFound()
    } 
    const history = await getHistoryList()
    
    return <Admin historyData={history}/>
}