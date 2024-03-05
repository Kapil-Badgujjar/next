
import { getCurrentUser } from "@/lib/session";

export const Navbar = async() => {
    const user = await getCurrentUser();
  return (
    <>
    </>
  )
}
