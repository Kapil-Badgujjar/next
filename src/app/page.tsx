'use client'
import { MainCarousel } from "@/components/carousel/main-carousel";
import { Container } from "@/components/container";
import { ProductsGroup } from "@/components/products-group/products-group";
export default async function HomePage(){
  return (
    <>
      <MainCarousel />
      <Container>
        <ProductsGroup collectionTitle={"New Arrivals"}/>
      </Container>
    </>
  );
}