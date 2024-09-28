import { errorResponse } from "@/lib/api";
import prisma from "@/lib/db";
import { deleteFile, getFile, uploadFile } from "@/lib/firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Constantes pour la validation
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILES = ["image/png", "image/jpeg", "image/jpg"];

// Schéma de validation pour la création de catégorie
const categoryCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name is too short")
    .max(255, "Category name cannot exceed 255 characters"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  description: z.preprocess(
    (val) => (typeof val === "string" && val === "" ? undefined : val),
    z.string().max(255).min(10).optional()
  ),
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

// Fonction GET pour récupérer les catégories
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
    console.error("Error fetching categories:", error);
    return errorResponse({ errors: error });
  } finally {
    console.log("GET request finished");
  }
}

// Fonction pour gérer l'upload d'image et les erreurs associées
async function handleImageUpload(image: File | undefined) {
  if (!image) return null;

  const filePath = await uploadFile(image, "categories/");
  if (!filePath) throw new Error("File upload failed");

  const fileUrl = await getFile(filePath);
  if (!fileUrl) throw new Error("File retrieval failed");

  return {
    fileUrl,
    filePath,
  };
}

// Fonction POST pour créer une catégorie
async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    if (!formData || formData.entries().next().done) {
      return errorResponse({ message: "No data provided", code: 400 });
    }

    // Convertir FormData en objet
    const body = Object.fromEntries(formData);

    // Valider les données
    const parsedData = categoryCreateSchema.safeParse(body);
    if (!parsedData.success) {
      return errorResponse({
        code: 400,
        message: "Invalid data",
        errors: parsedData.error.errors,
      });
    }

    // Traiter l'upload de fichier si une image est présente
    const { image, ...data } = parsedData.data;
    const file = await handleImageUpload(image);

    // Créer la catégorie dans la base de données
    try {
      const result = await prisma.category.create({
        data: {
          ...data,
          ...(file && {
            image: {
              create: {
                url: file.fileUrl,
                alt: data.name,
                path: file.filePath,
              },
            },
          }),
        },
        include: {
          ...(file && { image: { select: { url: true, alt: true } } }),
        },
      });

      return NextResponse.json({
        message: "success",
        success: true,
        code: 200,
        data: result,
      });
    } catch (error) {
      if (file) {
        await deleteFile(file.filePath);
      }
      return errorResponse({
        code: 500,
        message: "Failed to create category",
        errors: error
      });
    }
  } catch (error: any) {
    console.error("Error during POST request:", error);
    return errorResponse({
      errors: error,
      message: error.message || "Internal server error",
    });
  }
}

export { GET, POST };
