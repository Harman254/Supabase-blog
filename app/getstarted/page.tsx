"use client"
import AuthForm from '@/components/Auth'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'
import { ResponsiveContainer } from "recharts"





const page = () => {
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session) {
            router.push('/')
        }

    }, [session, router])
    return (
            <div className='container flex flex-col mt-10 pt-10 max-w-lg'>
                <h1 className='scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl'>Getting Started with OutWear?</h1>

                <h1 className="scroll-m-20 text-2xl text-center font-semibold tracking-tight"> Create an account and join the leading community</h1>
                <AuthForm />
            </div>



    )
}

export default page