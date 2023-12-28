'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from './Avatar'
import { Button, buttonVariants } from './ui/button'
import { toast } from './ui/use-toast'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      toast(
        {
          title: 'Error loading user data',
          variant: "destructive"
        })
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast({
        title: 'Profile updated',
      })
    } catch (error) {
      toast({
        title: 'Error updating profile',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto mt-20 pt-12 max-w-full lg:w-1/2 px-4 py-8">
      <Avatar
        //@ts-ignore
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <div className='my-4 '>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={session?.user?.email}
          disabled
          className="w-full p-2 border rounded"
        />
      </div>
      <div className='my-4'>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className='my-4'>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className='my-4'>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className='my-4'>
        <Button
          variant="secondary"
          className="w-full p-2 bg-primary text-black font-semibold rounded cursor-pointer"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <Button variant="default" className="w-full p-2 bg-primary rounded-md cursor-pointer" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  )
}