
"use client"
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';
import { Avatar } from '@radix-ui/react-avatar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types';
import { ModeToggle } from './ToggleMode';
import Image from 'next/image';

type Props = {}


const items = [
    { label: 'Home', url: '/' },
    { label: 'Trending', url: '/trending' },
    { label: 'Account', url: '/account' },
    { label: 'Dashboard', url: '/dashboard' },
];

const Navbar = () => {
    const router = useRouter()

    const supabase = createClientComponentClient<Database>()


    const session = useSession()
    if (!session) null

    const handleSignout = async () => {
        await supabase.auth.signOut()
        router.push("/")

    }
    console.log(session)

    return (


        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/logo.png" width={50} height={50} alt='logo' />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Outwear</span>
                </Link>
                <div className="flex items-center md:order-2 space-x-5 md:space-x-0 rtl:space-x-reverse">
                    <div className='flex space-x-4 m-5'>
                        <ModeToggle />

                    </div>
                    <div className='flex justify items-center'>
                        {session ? (
                            <>
                                <Button onClick={handleSignout}>
                                    Sign out
                                </Button>
                            </>

                        ) : (
                            <Button className='sm:hidden' onClick={() => router.push("/getstarted")}>Get Started</Button>
                        )}



                    </div>

                </div>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {items.map((item, index) => (
                            <Link href={item.url} key={index} className='font-semibold hover:text-primary  tracking-tight'> {item.label}</Link>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>



    )
}

export default Navbar




{/* <nav className="bg-muted fixed w-full z-20 top-0 left-0 border-b ">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className='flex justify-center items-center'>
        <img src="/logo.png" className="h-8 mr-3" alt="Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">OutWear</span>
        </Link>
    <div className="flex md:order-2">
        
        <div className='flex justify items-center'>
            { session ? (
                <>
                <Button onClick={handleSignout}>
                    Sign out
                </Button>
                </>

            ): (
                <Button className='sm:hidden' onClick={() => router.push("/getstarted")}>Get Started</Button>
            )}
        </div>
        
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
        </button>
    </div>
    <div className='flex space-x-7'>
            
    </div>

</div>
</nav> */}