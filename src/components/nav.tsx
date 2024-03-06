'use client'
import Link from "next/link";
import { Container } from "@/components/container";
import { signOut, useSession } from "next-auth/react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { FaRegUserCircle } from "react-icons/fa";


export const Nav = () => {
    const session = useSession();
    const user = session.data?.user;
    console.log(user);
  return (
    <header className="sticky bg-blue-500 py-4">
      <Container>
        <nav className="flex justify-between items-center mx-auto">
          <Link href="/" className="text-white text-2xl font-bold">
            NextCommerce
          </Link>

          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
              {user?.name ? (
                <div className="flex items-center">
                  <Popover>
                    <PopoverTrigger className="flex items-center">
                      <FaRegUserCircle color="white" size="1.5em" />
                    </PopoverTrigger>
                    <PopoverContent className="w-fit mr-2">
                      <div className="w-full flex flex-col justify-start items-start gap-2 p-2 rounded-md">
                        <button>My Account</button>
                        <button>My Orders</button>
                        <button onClick={() => signOut()} className="hover:underline">
                          Logout
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <li>
                  <Link href="/auth/login" className="text-white hover:underline">
                    Login
                  </Link>
                </li>
              )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
