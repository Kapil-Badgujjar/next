// import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {

    return NextResponse.json({}, { status: 200})

  } catch(error) {
    return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
  }
}