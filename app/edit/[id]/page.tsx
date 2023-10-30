import Editor from '@/components/Editor'
import React from 'react'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types'

type Props = {
    params: {
        id: string;
    }
}



const editPage = async ({params}: Props) => {
    const supabase = createServerComponentClient<Database>({ cookies});
    const { data } = await supabase.from('posts').select('*').eq('id', params.id).single();
    console.log(data)
    console.log(data)

  return (
    <div className='pt-10 mt-12'>
        <Editor post={data} />
    </div>
  )
}

export default editPage