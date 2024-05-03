'use client'


import { FormEvent, FormEventHandler, useState } from "react"
import clsx from "clsx"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const SignupForm = () => {
    const [errorResponse, setErrorResponse] = useState<boolean>(false)
    const { replace } = useRouter()

    const onSubmit: FormEventHandler = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        
        const response = await signIn('credentials', {
            username: formData.get("username"),
            password: formData.get("password"),
            name: formData.get("name"),
            mode: 'signup',
            redirect: false,
        })
        
        if (!response || response.error) {
            setErrorResponse(true)
        } else {
            replace("/clients")
        }
    }

    return (
        <form method="POST" onSubmit={onSubmit} className="text-sm w-full mt-6 flex flex-col" autoComplete="off">
            <div className="flex flex-col w-80 items-center m-auto h-full">
                <div className="w-11/12 mb-4">
                    <input 
                        type="text"
                        required 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@flowbite.com" 
                        name="username"
                        autoComplete="new-text"
                    />
                </div>
                <div className="w-11/12 mb-4">
                    <input 
                        type="password" 
                        required 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Пароль"
                        name="password"
                        autoComplete="new-password"
                    />
                </div>
                <div className="w-11/12 mb-4">
                    <input 
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Ф.И.О."
                        name="name"
                        autoComplete="new-text"
                    />
                </div>
                <div className="w-11/12 justify-self-end text-white flex grow flex-col-reverse text-lg">
                    <input
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                        value="Регистрация" 
                    />
                </div>
                <span className={clsx("text-red-600 mt-4", {"hidden": !errorResponse})}>Неправильный эмайл или пароль</span>
            </div>
        </form>
    )
}

export default SignupForm
