import Image from "next/image";
import { Button } from "../ui/button";

import Link from "next/link";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  imageSource: string;
}
export const Product = async ({
  id,
  title,
  price,
  imageSource,
}: ProductProps) => {
  return (
    <div className="flex flex-col justify-between w-full border border-gray-100 shadow-md rounded-sm p-4">
      <div>
        {/* Todo: Change image address to props imageSource */}
        <Link className="w-full flex justify-center" href={`/product/${id}`}>
          <Image
            className="object-cover transition ease-in-out duration-500 hover:scale-110"
            width={160}
            height={160}
            src={imageSource}
            alt={`Product ${id}`}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="mt-2 h-20">
          <h1>&#8377; {price}/-</h1>
          <p className="text-sm md:text-lg font-semibold">{title}</p>
        </div>
        <Link className="w-full" href={`/product/${id}`}>
          <Button
            size="sm"
            // className="w-full hover:bg-sky-400 hover:text-primary-foreground"
            className="w-full bg-gray-200 text-black hover:bg-blue-500 hover:text-white"
          >
            Buy now
          </Button>
        </Link>
      </div>
    </div>
  );
};
