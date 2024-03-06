// import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // const product = await prisma.product.findUnique({ where: { id } });
    const product: ProductType = {
      id:'65e8820563f271f5b05b553f',
      image:
        "https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2F68d5b9cb-149c-406c-a9cf-6b84af925345.jpg?alt=media&token=66d94ba0-d619-4bb3-91e1-b014869b1fd9",
      productName: "Smart Watch",
      price:3499.0,
      category: "Accessories",
      description:
        "Best smart watch with ecg tracker and 7 days battery life. golden color. 2 inch display.",
      stocks:100,
      sellerId:"64d5199be7d9f7d1f2bd2c5c",
      offer:0,
      isAssured: false,
      isActive: true,
      otherSpecifications: {
        color: "Baby pink",
        display: "2 inch",
        battery: "1000mAh",
      },
    };

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err); // Implement detailed error handling/logging in production
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
