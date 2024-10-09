/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

const useModal = (initialMode: boolean) => {   
    const [modalOpen, setModalOpen] = useState<any>(initialMode)   
    const toggle = () => setModalOpen(!modalOpen)   
    return [modalOpen, setModalOpen, toggle] 
}

export default useModal