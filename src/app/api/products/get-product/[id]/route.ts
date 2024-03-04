import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params:{id:string }}) => {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err); // Implement detailed error handling/logging in production
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
