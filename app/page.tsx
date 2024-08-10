import Image from "next/image"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import { Button } from "./_components/ui/button"
import { SearchIcon } from "lucide-react"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import { quickSearhOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"

const Home = async () => {
  const barberShops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  console.log({ barberShops })

  return (
    <div>
      <Header />
      <div className="p-5">
        {/* TEXTO SAUDAÇÃO */}
        <h2 className="text-xl font-bold">Olá, Glécio!</h2>
        <p>Segunda-feira, 05 de agosto de 2024</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearhOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={16}
                height={16}
              ></Image>
              {option.title}
            </Button>
          ))}
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
        <BookingItem />
        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
