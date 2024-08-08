import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface BarberShopItemProps {
  barberShop: Barbershop
}

const BarberShopItem = ({ barberShop }: BarberShopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* Imagem */}
        <div className="relative h-[159px] w-full">
          <Image
            alt={barberShop.name}
            fill
            className="obeject-cover rounded-2xl"
            src={barberShop.imageUrl}
          ></Image>
        </div>

        {/* Texto */}
        <div className="px-1 py-3">
          <h3 className="overflow-hidden truncate text-nowrap font-semibold">
            {barberShop.name}
          </h3>
          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>
          <Button variant="secondary" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
