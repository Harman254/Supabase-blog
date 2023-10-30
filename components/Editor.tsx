"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import uniqid from "uniqid";
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
import { useSession } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Textarea } from "./ui/textarea"

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
    }),
    user_id: z.string()
})

type Props = {
    post: {
        id: string;
        title: string;
        description: string;
        image: string;
        created_at: string;
        author: string;
        user_id: string;
    }
}

const Editor = ({ post }: Props) => {
    const router = useRouter()
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setIsUploadingImage] = useState(false);
    const [imageUrl, setImageUrl] = useState("")
    const supabase = createClientComponentClient<Database>()
    const Post = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            image: post.image || imageUrl,
            title: post.title,
            description: post.description,
            author: post.author,
            user_id: session?.user?.id || post.user_id


        }
    })


    const onSubmit: SubmitHandler<z.infer<typeof PostSchema>> = async (data) => {
        setLoading(true)
        const supabase = createClientComponentClient<Database>()
        const {  error } = await supabase
            .from("posts")
            .update({
                image: imageUrl || post.image,
                title: data.title || post.title,
                description: data.description || post.description,
                author: data.author || post.author,
                user_id: session?.user?.id || post.user_id
            })
            .eq('id', post.id); 

        setLoading(false)

        if (error) {
            setLoading(false)
            console.log(error.message)
            toast({
                variant: "destructive",
                title: "Error updating content",
            })
        } else {
            toast({
                variant: "default",
                title: "Content updated successfully",
            })
            setLoading(false)
        }

        Post.reset()
        router.push("/trending")
    }



    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.');
        }

        setIsUploadingImage(true);

        const uniqueID = uniqid();

        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `${uniqueID}-${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

        if (uploadError) {
            toast({
                variant: "destructive",
                title: uploadError.message,
            });
        } else {
            const imageUrl = supabase.storage.from('images').getPublicUrl(filePath);
            setImageUrl(imageUrl.data.publicUrl);
            toast({
                variant: "default",
                title: "Image uploaded successfully",
            });
        }

        setIsUploadingImage(false);
    };



    return (
        <div className="flex justify-center min-h-screen">
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
                                        <Input onChange={handleImageUpload} accept="image/*" type="file" />
                                    </FormControl>
                                    {uploadingImage ? <p className="text-center text-primary">uploading...</p> : null}
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
                                    <Textarea placeholder="content title" {...field} />
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
                                    <Textarea placeholder="Type your description here." {...field} />

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

                        <Button className="w-1/2" type="submit">{loading ? "Updating..." : "Update"}</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Editor