import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import { Database } from '@/types'
import PostCard from './PostCard'

type PostsProps = {

}

const Posts = async () => {

  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: posts, error } = await supabase
    .from('posts')
    .select("*")

    console.log(posts)
    if(error) console.log(error)
  return (
    <div className='flex container p-4 space-x-3'>
      { posts?.map((post) => (
          <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts