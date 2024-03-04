export const getData = async (): Promise<ProductType[]> => {
  const res = await fetch(
    "http://localhost:3000/api/products/get-all-products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
