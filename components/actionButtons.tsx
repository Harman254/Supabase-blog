"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

type Props = {
    id: string;
}

const ActionButtons = ({id} : Props) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/edit/${id}`);
    }
    const handleDelete = () => {

    }

    return (
        <div className='flex gap-4 bg-muted'>
            <Button onClick={handleClick} className='px-4 bg-foreground text-primary font-xl py-2'>Edit</Button>
            <Button onClick={handleDelete} variant={"destructive"}>Delete</Button>
        </div>
    )
}

export default ActionButtons