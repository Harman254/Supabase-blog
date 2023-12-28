import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types'
import PostCard from '@/components/PostCard'

interface Post {
  id: string;
  created_at: string;
  image: string;
  title: string;
  description: string;
  author: string;
}

const TrendsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: trendingPosts } = await supabase.from("posts").select("*").order("created_at", { ascending: false })


  return (
    <div className=' bg-muted'>
      <div className=' container min-h-screen space-y-5 flex mt-20 py-5 flex-col lg:flex-row lg:justify-between flex-wrap space-x-4 mx-auto'>
        {trendingPosts?.map((post: Post) => (
          <PostCard post={post} key={post.id} />
        ))}

      </div>
    </div>
  )
}

export default TrendsPage