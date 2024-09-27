import axios, { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "@/types/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Fonction pour gérer les erreurs Axios
function handleAxiosError(error: AxiosError<ErrorResponse>): ErrorResponse {
  return {
    success: false,
    message: error.response?.data?.message || "An error occurred!",
    code: error.response?.status || 500,
    errors: error.response?.data?.errors || null,
  };
}

type Response<T> = SuccessResponse<T> | ErrorResponse;


export async function fetchData<D>(url: string | URL): Promise<Response<D>> {
  try {
    const response = await axios.get<SuccessResponse<D>>(
      url instanceof URL ? url.toString() : url
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error);
    }
    return {
      success: false,
      message: "Unexpected error occurred",
      code: 500,
      errors: error instanceof Error ? error.message : null,
    };
  }
}
