"use client"
import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/PostForm'
import { Button } from '@/components/ui/button'

type Props = {}

const DashboardPage = () => {
    const session = useSession()
    const router = useRouter()

  return (
    <div className='container mx-auto flex flex-col pt-12 mt-12'>
        { session ? <div className='flex justify-center items-center'>
        
            <PostForm />
        </div> : (
            <div className='container mx-auto flex flex-col pt-12 mt-12 justify-center items-center space-y-3'> <p className='font-semibold text-xl'>
                You are not logged in. Please login to continue.
            </p>
            <Button className='w-[200px]' onClick={() => router.push('/getstarted')}>SignIn</Button>
            </div>
        )}

    </div>
  )
}

export default DashboardPage
