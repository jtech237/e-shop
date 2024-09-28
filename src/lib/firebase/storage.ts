import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { nanoid } from "nanoid";

// Fonction pour uploader un fichier avec timeout
export const uploadFile = async (
  file: File,
  folder: string,
  timeout: number = 10000
): Promise<string | null> => {
  const timeoutPromise = new Promise<null>((_, reject) =>
    setTimeout(() => reject(new Error("File upload timed out")), timeout)
  );

  const uploadPromise = async () => {
    const extension = file.name.split(".").pop(); // Récupérer l'extension du fichier
    const filename = `${nanoid()}.${extension}`; // Générer un nom unique avec nanoid
    const storageRef = ref(storage, `${folder}${filename}`);

    // Upload du fichier sur Firebase Storage
    const uploadResult = await uploadBytes(storageRef, file);

    // Retourne le chemin complet du fichier dans le storage Firebase
    return uploadResult.metadata.fullPath;
  };

  try {
    // Fais concourir l'upload et le timeout
    return await Promise.race([uploadPromise(), timeoutPromise]);
  } catch (error) {
    console.error("Error during file upload:", error);
    throw new Error("File upload failed or timed out");
  }
};

export const getFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (path: string, timeout: number = 10000) => {
  const timeoutPromise = new Promise<null>((_, reject) =>
    setTimeout(() => reject(new Error("File upload timed out")), timeout)
  );

  const deletePromise = async () => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  };

  try {
    return await Promise.race([deletePromise(), timeoutPromise]);
  } catch (error) {
    console.error("Error during file deleting", error);
    throw new Error("File delete failed or time out");
  }
};
