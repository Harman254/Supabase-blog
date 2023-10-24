import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types'
import { redirect } from 'next/navigation'
import PostCard from '@/components/PostCard'

interface Post {
  id: string;
  created_at: string;
  image: string;
  title: string;
  description: string;
  author: string;
}

const TrendsPage = async() => {
  const supabase = createServerComponentClient<Database>({ cookies})
  const session = await supabase.auth.getSession()

  if(!session) redirect("/getstarted")
   const trendingPosts = await supabase.from("posts").select("*").order("created_at", { ascending: false})


  return (
    <div className='min-h-screen bg-muted'>
      <div className='mt-12 pt-12 font-xl container h-full flex space-x-4 mx-auto'>
      {trendingPosts?.data?.map(( post: Post) => (
        <PostCard post={post} key={post.id}/>
      ))}

    </div>
    </div>
  )
}

export default TrendsPage