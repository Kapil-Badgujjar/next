'use client'
import { MainCarousel } from "@/components/carousel/main-carousel";
import { Container } from "@/components/container";
import { HomeFooter } from "@/components/footer/home-footer";
import { ProductsGroup } from "@/components/products-group/products-group";
export default function HomePage(){
  return (
    <>
      <MainCarousel />
      <Container>
        <ProductsGroup collectionTitle={"New Arrivals"}/>
      </Container>
      <HomeFooter />
    </>
  );
}