import { errorResponse } from "@/lib/api";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        image: {
          select: {
            url: true,
            alt: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "success",
      success: true,
      code: 200,
      data: categories,
    });
  } catch (error: any) {
    console.error("Error while fetching categories in database", error);
    return errorResponse({ errors: error });
  } finally {
    console.log("Request finished");
  }
}

export {GET}