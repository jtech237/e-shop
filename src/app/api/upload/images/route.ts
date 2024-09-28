import { errorResponse } from "@/lib/api";
import { uploadFile } from "@/lib/firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILES = ["image/png", "image/jpeg", "image/jpg"];
const bodySchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Max file size allowed is 5MB."
    )
    .refine(
      (file) => !file || ACCEPTED_FILES.includes(file?.type),
      "Invalid file. Choose either JPEG or PNG image"
    ),
});
export async function POST(req: NextRequest) {
  try {
    let formData: FormData | null = null;
    try {
      formData = await req.formData();
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
    const parsedData = bodySchema.safeParse(body);
    if (!parsedData.success) {
      return errorResponse({
        code: 400,
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
    }
    const { image } = parsedData.data;
    const imageUrl = await uploadFile(
      image,
      "default/"
    );
    return NextResponse.json(
      {
        message: "success",
        success: true,
        code: 201,
        data: imageUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return errorResponse({ errors: error });
  }
}
