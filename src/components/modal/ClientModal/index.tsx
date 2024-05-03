'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Modal from ".."
import { useState } from "react"

type OwnProps = {
    children: React.ReactNode
}

export default function ClientModal({children}: OwnProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const onClose = () => {
        const params = new URLSearchParams(searchParams)
        params.delete("mode")
        const path = searchParams.size > 0 ? `/clients?${params.toString()}` : `/clients`
        router.push(path)
    }

    return (
        <Modal onClose={onClose}>
            {children}
        </Modal>
    )
}