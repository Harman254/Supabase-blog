import React from 'react'
import PostForm from './PostForm'
import Posts from './Posts'

type LandingProps = {}

const Landing = () => {
  return (
    <div className='container flex flex-col min-h-screen bg-background-primary'>

      <PostForm />
      <Posts />

    </div>
  )
}

export default Landing