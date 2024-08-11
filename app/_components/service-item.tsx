"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format, set, setHours, setMinutes } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  )

  const handleDayselect = (date: Date | undefined) => {
    setSelectedDay(date)
    console.log(selectedDay)
  }

  const handleTimeSelect = (time: String | undefined) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return
      const hour = Number(selectedTime?.split(":")[0])
      const minute = Number(selectedTime?.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("reserva realizada com sucesso")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="p-0">
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* DIREITA */}
        <div className="space-y-3">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-xs text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <h2 className="text-primary">R$ {service?.price}</h2>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-4">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva!</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-5">
                  <Calendar
                    onSelect={handleDayselect}
                    mode="single"
                    locale={ptBR}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime == time ? "default" : "outline"}
                        className="rounded-full border border-solid"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <Card className="px-2">
                    <CardContent className="space-y-3 p-3">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(service.price))}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Data</h2>
                        <p className="text-right text-sm font-bold">
                          {format(selectedDay, "d 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Horário</h2>
                        <p className="text-right text-sm font-bold">
                          {selectedTime}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Barbearia</h2>
                        <p className="text-right text-sm font-bold">
                          {barbershop.name}
                        </p>
                      </div>

                      <SheetFooter>
                        <SheetClose asChild>
                          <Button onClick={handleCreateBooking}>
                            Confirmar
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </CardContent>
                  </Card>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
