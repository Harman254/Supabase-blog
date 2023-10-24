"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types"
import { toast } from "./ui/use-toast"

const PostSchema = z.object({
    image: z.string(),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters"
    }),
    description: z.string().min(2, {
        message: "Description must be more than 2 characters"
    }),
    author: z.string().min(2, {
        message: "Author must be at least 2 characters"
    })
})

const PostForm = () => {
    const [loading, setLoading] = useState(false)
    const Post = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            title: "",
            description: "",
            author: ""

        }
    })


    const onSubmit: SubmitHandler<z.infer<typeof PostSchema>> = async (data) => {
        setLoading(true)
        const supabase = createClientComponentClient<Database>()
        const { error } = await supabase.from("posts").insert({
            title: data.title,
            description: data.description,
            author: data.author
        })
        setLoading(false)

        if (error) {
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Error uploading content",
            })
        } else {
            toast({
                variant: "default",
                title: "Content uploaded successfully",
            })
            setLoading(false)
        }

        Post.reset()
    }
    return (
        <Form {...Post}>
            <form onSubmit={Post.handleSubmit(onSubmit)} className="space-y-8  flex flex-col mt-5 w-[600px]">
                <FormField 
                control={Post.control}
                name="image"
                render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel> Content Image</FormLabel>
                            <FormControl>
                                <Input type="file" {...field} />
                            </FormControl>
                        </FormItem>

                        
                    )
                }
                
                
                
                />
                <FormField
                    control={Post.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="content title" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField

                    control={Post.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="content description" {...field} />

                            </FormControl>
                        </FormItem>
                    )}

                />

                <FormField
                    control={Post.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input placeholder="author" {...field} />
                            </FormControl>
                        </FormItem>
                    )}

                />
                    <div className="flex items-center justify-center">
                        
                <Button className="w-1/2" type="submit">{loading ? "Uploading..." : "Submit"}</Button>
                        </div>                
            </form>
        </Form>
    )
}

export default PostForm