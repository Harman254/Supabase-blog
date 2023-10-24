import React from 'react'
import { Button } from './ui/button';
import Image from "next/image";
import Link from 'next/link';
interface Post {
  id: string;
  created_at: string;
  image: string;
  title: string;
  description: string;
  author: string;
}

type PostCardProps = {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  console.log(post)
  return (

    <Link href={`/trending/${post.id}`}>
    <div className="max-w-sm bg-muted border h-full rounded-lg shadow-md ">
      <a href="#">
        <img className="rounded-t-lg" src={post.image} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-foreground">{post.title}</h5>
        </a>
        <p className="mb-3 font-lg text-accent-foreground">{post.description.slice(0, 100) + "..."}</p>
        <Link href={`/trending/${post.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>
    </Link>
    



  )
}

export default PostCard