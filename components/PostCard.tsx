"use client"
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Database } from '@/types';
import { toast } from './ui/use-toast';
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
  const supabase = createClientComponentClient<Database>();
  console.log(post.image)

  
  
  return (
    <div className="rounded-md border w-1/2 shadow-md overflow-hidden">
        <Link href={`/trending/${post.id}`}>
        <div className="flex">
          <Image
            className="w-1/2 rounded-md"
            objectFit="cover"
            quality={100}
            width={150}
            height={100}
            src={post.image}
            alt={post.title}
          />
          <div className="p-4">
            <h2 className="text-3xl font-semibold mb-2">{post.title}</h2>
            <p className="text-accent-foreground">{post.author}</p>
            <p className="text-xl font-semibold text-wrap">
              {post.description.slice(0, 100) + "..."}
            </p>
          </div>
        </div>
    </Link>
      </div>
  );
};

export default PostCard