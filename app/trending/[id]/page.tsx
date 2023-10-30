import { Database } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from "next/headers"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { Link } from 'lucide-react';
import ActionButtons from '@/components/actionButtons';




type Props = {
    params: {
        id: string;
    }
}

const Article: React.FC<Props> = async ({ params }) => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const session = await supabase.auth.getSession()
    const user_id = session.data.session?.user?.id
    const { data: post, error } = await supabase
        .from('posts')
        .select("*")
        .eq('id', params.id)
        .single()
        
        console.log(post.image)
    

    return (
            <Card className='bg-accent pt-12 mt-12 min-h-screen px-10'>
                <CardHeader>
                    <div className='flex flex-col'>
                    <CardTitle className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>{post?.title}</CardTitle>
                    <CardDescription>author:_{post?.author}  </CardDescription>
                    <CardDescription>Created: {post?.created_at}</CardDescription>
                    </div>
                    { user_id === post.user_id ? (<>
                    <ActionButtons id={post.id} />
                    </>): null}
                </CardHeader>
                <CardContent>
                    <Image src={post?.image} alt={post?.title} width={500} height={500}  />
                    <span className='text-sm'>Fig: {post.id}</span>
                    <p className="leading-7 antialiased inline-block [&:not(:first-child)]:mt-6">{post?.description}</p>
                </CardContent>
                
            </Card>







    )
}

export default Article