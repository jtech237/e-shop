import { PrismaError } from "@/types/api";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const errorResponse = ({
  message = "Internal server error",
  code = 500,
  errors = null,
}: {
  message?: string;
  code?: number;
  errors?: PrismaError | any;
}) => {
  return NextResponse.json(
    {
      success: false,
      message,
      code,
      ...(process.env.NODE_ENV === "development" && errors && { errors }),
    },
    { status: code }
  );
};

export function formatPrismaError(
  error: PrismaClientKnownRequestError
): PrismaError {
  return {
    code: error.code,
    meta: error.meta,
  };
}

export async function uploadImage(to: string) {
  
  
}
