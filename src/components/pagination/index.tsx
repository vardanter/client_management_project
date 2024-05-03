import { ITEMS_PER_PAGE } from "@/constants"
import { clsx } from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type OwnProps = {
    size: number
}

export default function Pagination({ size }: OwnProps) {
    const [pages, setPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [shownPages, setShownPages] = useState<number[]>()
    const [startPage, setStartPage] = useState<number>(0)
    const [endPage, setEndPage] = useState<number>(0)
    const [isPaginationExists, setIsPaginationExists] = useState<boolean>(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const paginationSize = 10

    const paginationList = () => {
        const pageIncrement = currentPage === pages ? 0 : 1
        const start = currentPage < paginationSize ? 0 : currentPage - paginationSize + pageIncrement
        let pagination = []
        if (pages) {
            for (let i = 1; i <= paginationSize; i++) {
                if ((start + i) > pages) {
                    break
                }
                pagination[i] = start + i
            }
        }
        return pagination
    }
    
    useEffect(() => {
        if (size > ITEMS_PER_PAGE) {
            const pagesCount = Math.ceil(size / ITEMS_PER_PAGE)
            const pagination = [...Array(paginationSize)].map((_, i) => i + 1)
            setShownPages(pagination)
            setPages(pagesCount)
        } else {
            setPages(0)
            setIsPaginationExists(false)
        }
    }, [size])

    useEffect(() => {
        if (pages && pages > 0) {
            const pagination = paginationList()
            currentPage > paginationSize - 1 ? setStartPage(1) : setStartPage(0)
            if (pages) {
                (pages - currentPage) <= 1 || pages <= paginationSize ? setEndPage(0) : setEndPage(pages)
            }
            setShownPages(pagination)
            setIsPaginationExists(true)
        } else {
            setIsPaginationExists(false)
        }
    }, [currentPage, pages, searchParams, size])

    useEffect(() => {
        const page = searchParams.get("page")
        if (page) {
            setCurrentPage(parseInt(page))
        } else {
            setCurrentPage(1)
        }
    }, [searchParams])

    const onClick = (page: number) => () => {
        if (currentPage !== page) {
            const params = new URLSearchParams(searchParams)
            params.delete("page")
            params.append("page", `${page}`)
            router.push(`/clients?${params.toString()}`)
        }
    }

    if (!isPaginationExists) {
        return null
    }

    return (
        <div className="flex items-center justify-around">
            <div className="flex items-center justify-around">
                {!!startPage && (
                    <span className={clsx(
                        "border border-gray-300 mx-1 bg-white rounded-full flex items-center justify-center  min-w-10 h-10",
                        "text-sky-700 cursor-pointer hover:shadow-md hover:bg-sky-500 hover:text-white"
                    )} onClick={onClick(startPage)}>{startPage}</span>
                )}
                {!!startPage && (currentPage - paginationSize) >= startPage && <span className="text-2xl mx-2 text-gray-400">...</span>}
                {
                    shownPages?.map(page => (
                        <span className={clsx(
                            "border border-gray-300 mx-1 rounded-full flex items-center justify-center min-w-10 h-10",
                            {
                                "text-white bg-sky-700 shadow-sm": page === currentPage, 
                                "text-sky-700 cursor-pointer bg-white hover:shadow-md hover:bg-sky-500 hover:text-white": page !== currentPage
                            }
                        )} key={page} onClick={onClick(page)}>{page}</span>
                    ))
                }
                {!!endPage && endPage > (currentPage + 2) && <span className="text-2xl mx-2 text-gray-400">...</span>}
                {endPage > 0 && (
                    <span className={clsx(
                        "border border-gray-300 mx-1 bg-white rounded-full flex items-center justify-center  min-w-10 h-10",
                        "text-sky-700 cursor-pointer hover:shadow-md hover:bg-sky-500 hover:text-white"
                    )} onClick={onClick(endPage)}>{endPage}</span>
                )}
            </div>
        </div>
    )
}