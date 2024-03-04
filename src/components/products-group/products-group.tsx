import { Product } from "@/components/product/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductsGroupProps {
    collectionTitle: string;
}

const getData = async (): Promise<ProductType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-all-products`,{
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export const ProductsGroup = async ({ collectionTitle }:ProductsGroupProps) => {
    const products = await getData();
  return (
    <div className="grid flex-col gap-4 py-4">
          <h1 className="text-2xl font-semibold">{collectionTitle}</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-2 md:gap-4">
            {products.map((product: ProductType) => (
              <span key={product.id} className="w-full flex h-full">
                <Product
                  id={product.id}
                  title={product.productName}
                  price={product.price}
                  imageSource={product?.image} // Potential error handling for invalid image
                />
              </span>
            ))}
          </div>
          <div className="flex justify-center ">
            <Link href={`/category/${collectionTitle.replace(' ','-')}`}
            className="bg-gray-300 text-black hover:bg-blue-500 hover:text-white"
            >View More</Link>
          </div>
        </div>
  )
}
