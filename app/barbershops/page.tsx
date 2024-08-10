import { useSearchParams } from "next/navigation"
import { db } from "../_lib/prisma"
import BarberShopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"

interface BarberShopPagePageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarberShopPage = async ({ searchParams }: BarberShopPagePageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot; {searchParams?.title || searchParams?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barberShop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarberShopPage
