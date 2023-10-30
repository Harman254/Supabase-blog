"use client"
import React from 'react'
import DashComponent from '@/components/DashComponent'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'



const DashboardPage = async () => {
    const session = useSession()
    const router = useRouter()

    if (!session) {

        router.push("/getstarted")
    }



    return (
        <div className='container mx-auto flex flex-col pt-12 mt-12'>
            <DashComponent />
            


        </div>
    )
}

export default DashboardPage
