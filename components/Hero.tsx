"use client"

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
type Props = {}

const Hero = () => {
    const session = useSession()
    const router = useRouter()
  return (
    <div className="container min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
    <div>
    <h1 className="block text-3xl font-bold text-foreground tracking-tight sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">Discover the Latest Trends in Fashion</h1>
    <p className="mt-3 text-xl text--foreground ">Stay in the know with our curated collection of articles, tips, and insights on fashion, style, and trends. Explore the world of haute couture, street fashion, and everything in between. Unleash your inner fashionista with us.</p>
      <div className="mt-7 grid gap-3 w-full sm:inline-flex">
        {session ? (
            
            <Button variant="default" onClick={() => router.push("/trending") } className='px-6 py-3'>
                Trending
            </Button>
        ): (
            <Button onClick={() => {router.push("/getstarted")}} className='font-bold px-6 py-3'>Get started <svg className="w-3 h-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg></Button>
        )}
      </div>
    </div>
    <Image className="max-w-full" width={600} height={700} src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=800&q=80"  alt="hero" />
  </div>
</div>

  )
}

export default Hero