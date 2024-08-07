"use client"

import { useState } from "react"

import Image from "next/image"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Badge } from "./_components/ui/badge"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import { Card, CardContent } from "./_components/ui/card"

const Home = () => {
  const [] = useState()
  return (
    <div>
      <Header />
      <div className="p-5">
        {/* TEXTO UDAÇÃO */}
        <h2 className="text-xl font-bold">Olá, Glécio!</h2>
        <p>Segunda-feira, 05 de agosto de 2024</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BANNER 01 */}
        <div className="relative mt-6 h-[150px] w-full rounded-xl">
          <Image
            alt="Agende nas melhores barbearias"
            src="/banner-01.png"
            className="rounded-xl object-cover"
            fill
          />
        </div>

        {/* AGENDAMENTO */}

        <Card className="mt-6">
          <CardContent className="flex">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5">
              <Badge>Confirmado</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
