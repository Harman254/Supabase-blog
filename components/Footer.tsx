"use client"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-muted border text-foreground ">
      <div
        className="
        container
        flex flex-col flex-wrap
        px-4
        py-16
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
      >
        <div className="flex-shrink-0 w-1/2 mx-auto text-center md:mx-0 md:text-left mr-5">
          <Link href={"/"} className="text-2xl flex items-start space-x-4">
            <Image src="/logo.png" alt="logo" width={75} height={75} />
            <h1 className=" tracking-tight text-accent-foreground font-bold text-2xl">OutWear</h1>
          </Link>
          <p className="mt-2 text-xl font-semibold text-justify text-muted">
            In a fast moving world, we believe we should be dressing way better than we actually are, and we are hear to share those fantastic fashion stories together.
          </p>
          <div className="flex mt-4 space-x-3">
            <Input type="email" placeholder="Email" />
            <Button  variant="destructive">Subscribe</Button>
          </div>
          <div className="flex justify-center mt-4 space-x-4 lg:mt-2">
            <Link href={""}>
              <Facebook className="text-blue-500" />
            </Link>
            <Link href={""}>
              <Twitter className="text-sky-300" />
            </Link>
            <Link href={""}>
              <Instagram className="text-pink-500" />
            </Link>
            <Link href={""}>
              <Linkedin className="text-blue-400" />
            </Link>
          </div>
        </div>
        <div className="justify-between flex-grow mt-4 text-center lg:flex">
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest ">
              Company
            </h2>
            <ul className="mb-8 space-y-2 flex flex-col">
              <li>
                <Link href={"/dashboard"} >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={"/about"} >
                  Legal policies
                </Link>
              </li>
              <li>
                <Link href={"/careers"} >
                  Careers and recruitment
                </Link>
              </li>
              
            </ul>
          </div>
          <div className="flex justify-center mt-12">
        <p className="text-center text-foreground">
          @2024 All rights reserved by your website.
        </p>
      </div>
          
        </div>
      </div>
      
    </footer>
  )
}