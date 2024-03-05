'use client'
import Link from "next/link";
import ButtonLogout from "@/components/button-logout";
import { Container } from "@/components/container";
import { useSession } from "next-auth/react"

export const Nav = () => {
    const session = useSession();
    const user = session.data?.user;
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
              <ButtonLogout />
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
