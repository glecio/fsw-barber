import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { quickSearhOptions } from "../_constants/search"
import Image from "next/image"

const SideBarSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex items-center gap-3 border-b border-solid py-5">
          <Avatar>
            <AvatarImage src="/avatar.png" alt="user image"></AvatarImage>
          </Avatar>
          <div className="">
            <p className="font-bold">Glecio Santos</p>
            <p className="text-xs">glecio@glecio.dev</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-b border-solid py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2" variant="ghost">
              <HomeIcon size={18} />
              <Link href="/">Início</Link>
            </Button>
          </SheetClose>
          <Button className="justify-start gap-2" variant="ghost">
            <CalendarIcon size={18} />
            Agendamento
          </Button>
        </div>
        <div className="flex flex-col gap-1 border-b border-solid py-5">
          {quickSearhOptions.map((option) => (
            <Button
              className="justify-start gap-2"
              variant="ghost"
              key={option.title}
            >
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
        <div className="flex flex-col gap-1 border-b border-solid py-5">
          <Button variant="ghost" className="justify-start gap-2">
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SideBarSheet
