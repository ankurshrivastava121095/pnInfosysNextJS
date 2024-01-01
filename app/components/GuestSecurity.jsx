/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const GuestSecurity = () => {

    const router = useRouter()

    useEffect(()=>{
        const token = localStorage.getItem('userToken')
        const user = localStorage.getItem('userData')

        if (user && token) {
            router.push('/admin/dashboard')
        }
    },[])

    return (
        <></>
    )
}

export default GuestSecurity