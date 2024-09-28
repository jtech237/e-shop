import { errorResponse } from "@/lib/api";
import prisma from "@/lib/db";
import { getFile, uploadFile } from "@/lib/firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILES = ["image/png", "image/jpeg", "image/jpg"];

const categoryCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name is too short")
    .max(255, "Category name cannot exceed 255 characters"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  description: z.preprocess((descrip) => {
    if (typeof descrip === "string" && descrip === "") {
      return undefined;
    } else {
      return descrip;
    }
  }, z.string().max(255).min(10).optional()),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Max file size allowed is 5MB."
    )
    .refine(
      (file) => !file || ACCEPTED_FILES.includes(file?.type),
      "Invalid file. Choose either JPEG or PNG image"
    ),
});

async function POST(req: NextRequest) {
  try {
    let formData: FormData | null = null;
    try {
      formData = await req.formData();
      console.log(formData);
    } catch (error: any) {
      console.error(error);

      return errorResponse({
        errors: error,
        code: 400,
        message: `Invalid request body:  ${error.message}`,
      });
    }

    if (formData.entries().next().done) {
      // Retourner une réponse 400 si FormData est vide
      return errorResponse({ message: "No data provided", code: 400 });
    }

    const body = Object.fromEntries(formData);
    const parsedData = categoryCreateSchema.safeParse(body);
    if (!parsedData.success) {
      return errorResponse({
        code: 400,
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
    }

    const { image, ...data } = parsedData.data;
    const filePath = image ? await uploadFile(image, "categories/") : null;
    const fileUrl = filePath && await getFile(filePath)

    const result = await prisma.category.create({
      data: {
        ...data,
        ...(fileUrl && { image: { create: { url: fileUrl, alt: data.name } } }),
      },
      include: {
        ...(fileUrl && { image: { select: { url: true, alt: true } } }),
      },
    });
    return NextResponse.json({
      message: "success",
      success: true,
      code: 200,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return errorResponse({ errors: error });
  }
}

export { GET, POST };
