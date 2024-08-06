"use client"

import { useState } from "react"

import Image from "next/image"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"

const Home = () => {
  const [] = useState()
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Glécio </h2>
        <p>Segunda-feira, 05 de agosto de 2024</p>
        <div className="mt-24 flex items-center gap-2">
          <Input />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            alt="Agende nas melhores barbearias"
            src="/banner-01.png"
            className="rounded-xl object-cover"
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default Home
