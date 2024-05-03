'use client'

export type ModalPropTypes = {
    children: React.ReactNode
    onClose?: () => void
}

const Modal = ({children, onClose}: ModalPropTypes) => {
    // if (!isModalShow) {
    //     return null
    // }

    return (
        <div className="modal fixed top-0 left-0 right-0 h-screen z-50 bg-[#9999998f] flex justify-center items-center overflow-hidden">
            <div className="min-h-[600px] bg-[#292f3ede] w-8/12 relative m-auto mt-14 flex justify-flex-start items-center flex-col p-2">
                <div className="flex w-full justify-end border-b border-b-white">
                    <span 
                        className="
                        relative h-8 w-8 self-end
                        before:content-[' '] before:absolute before:w-1 before:h-6 before:rotate-45 before:bg-white before:left-5 before:rounded-sm
                        after:content-[' '] after:absolute after:w-1 after:h-6 after:-rotate-45 after:bg-white after:left-5 after:rounded-sm
                        "
                        onClick={onClose}
                    />
                </div>
                <div className="modal-body flex flex-col w-full grow">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal