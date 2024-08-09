"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

const handleCopyPhoneClick = (phone: string) => {
  let copiedPhone = navigator.clipboard.writeText(phone)
  if (copiedPhone != null) {
    alert("telefone copiado")
  }
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
