"use client"
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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



  return (
   
    <Card className="py-4 h-2/3 overflow-hidden rounded-lg">
         <Link href={`/trending/${post.id}`}>

      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold text-primary">{post.author}</p>
        <small className="text-default-500">{post.created_at}</small>
        <h4 className="font-bold text-large text-primary">{post.title}</h4>
      </CardHeader>
      <CardContent className="py-2"> 
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={post.image}
          height={270}
          width={270}
        />
        <CardDescription className="text-accent-foreground text-base mt-3">{post.description.slice(0, 150)} ...</CardDescription>
      </CardContent>
   </Link>


    </Card>

  );
};

export default PostCard