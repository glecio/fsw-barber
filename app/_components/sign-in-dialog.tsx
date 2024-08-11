import Image from "next/image"
import { Button } from "./ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")
  return (
    <>
      <DialogHeader className="gap-2">
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google!
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="outline"
        className="gap-1 space-x-2 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image alt="Google" src="../google.svg" width={18} height={18} />
        Google
      </Button>
    </>
  )
}

export default SignInDialog
