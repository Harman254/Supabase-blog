"use client"
import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import AccountForm from '@/components/Account'

type Props = {}

const AccountPage = () => {
    const session = useSession()
    const router = useRouter()

    console.log(session)
    if(!session) router.push("/getstarted")
  return (
    <div className='container mx-auto flex flex-col'>
        <AccountForm session={session} />

    </div>
  )
}

export default AccountPage
