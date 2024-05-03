
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler} from "react";

type OwnProps = {
    onOutsideClick: MouseEventHandler
}

export default function AccountMenu({ onOutsideClick }: OwnProps) {
    const {data: session, status} = useSession()
    const router = useRouter()

    const onSignOut: MouseEventHandler = async (event) => {
        event.preventDefault()
        await signOut({redirect: false})
        router.replace("/signin")
    }

    return (
        <div className="w-60 text-sm flex items-center justify-end">
            <Link href="/" className="p-2 hover:text-sky-200 hover:underline">
                Главная
            </Link>
            {!!session?.user.isStaff && (
                <Link href="/admin" className="p-2 hover:text-sky-200 hover:underline whitespace-nowrap">
                    Админ панель
                </Link>
            )}
            {status === 'authenticated' && (
                <>
                    <Link href="/clients" className="p-2 hover:text-sky-200 hover:underline whitespace-nowrap">
                        Список клиентов
                    </Link>
                    <Link href="" onClick={onSignOut} className="p-2 hover:text-sky-200 hover:underline">
                        Выйти
                    </Link>
                </>
            )}
            {status === 'unauthenticated' && (
                <>
                    <Link href="/signup" className="p-2 hover:text-sky-200 hover:underline">
                        Регистрация
                    </Link>
                    <Link href="/signin" className="p-2 hover:text-sky-200 hover:underline">
                        Логин
                    </Link>
                </>
            )
            }
        </div>
    )
}