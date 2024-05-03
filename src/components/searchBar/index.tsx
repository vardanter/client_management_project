'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";


export default function SearchBar() {
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        params.delete("page")
        replace(`${pathName}?${params.toString()}`)
    }, 300)

    return (
        <div className="relative flex items-center justify-end w-full">
            <input 
                id="search-bar"
                placeholder="Поиск клиента по уникальному идентификатору"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2" 
                name="search"
                onChange={(e) => handleSearch(e.target.value)}
                autoComplete="new-text"
                defaultValue={searchParams.get("query")?.toString()}
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-2 top-2.5" />
        </div>
    )
}