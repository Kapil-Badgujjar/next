import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import ButtonLogout from "../button-logout";
import { Container } from "@/components/container";

export const Navbar = async () => {
  const user = await getCurrentUser();
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
  );
};
