import { getData } from "./getProducts";
import { GetServerSideProps } from "next"; // Assuming you're using Next.js

// Assuming a type for your products, if not, define it based on the actual product structure
interface Product {
  // Add product properties here
  id: string;
  name: string;
  // etc.
}

// Defining the context type, assuming you're using Next.js
interface Context {
  query: {
    filterProductsBy?: string;
  };
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Destructuring with a default value
//   const { filterProductsBy = "" } = context.query;

  // Assuming getData is properly typed to return a Promise<Product[]>
  const products: ProductType[] = await getData();

  return {
    props: {
      products,
    },
  };
};
