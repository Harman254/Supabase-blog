'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from './ui/use-toast'
import { Input } from './ui/input'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function AvatarComponent({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error uploading file"
      })
    } finally {
      setUploading(false)
    }
  }

  return (

    <div className='flex flex-col gap-5 items-center justify-center'>
      {avatarUrl ? (
        <div className='w-[75px] h-[75px]'>
          <Avatar className="relative mt-5">
          <AvatarImage src={avatarUrl} width={75} height={75} alt="Avatar"  />
          <AvatarFallback className="absolute inset-0 flex items-center justify-center w-full h-full rounded-full bg-gray-300 text-gray-600 font-bold text-2xl">HM</AvatarFallback>
        </Avatar>
        </div>
      ) : (
        <div className={`avatar no-image w-${size} h-${size}`} />
      )}
      <div className="flex">
        <label className="text-primary font-semibold p-2 rounded-md" htmlFor="avatar-upload">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <Input type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}/>
      </div>
    </div>
  )
}