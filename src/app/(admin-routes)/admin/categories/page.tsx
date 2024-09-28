"use client";

import PageHeader from "@/components/PageHeader";
import { CategoryRowSkeleton } from "@/components/skeletons";
import { fetchData } from "@/lib/utils";
import { Category } from "@/types/data";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetchData<Category[]>("/api/categories");
        if (!res.success) {
          if (res.code === 404) throw new Error("Catégories non trouvées");
          else if (res.code === 500)
            throw new Error("Problème serveur, réessayez plus tard");
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const categories = res.data;
        setData(categories);
      } catch (error: any) {
        setError(error.message);
        console.error("Error when fetch products", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader title="Categories" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Liste des categories
          </h4>
        </div>
        {/* Header */}
        <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center font-bold text-xl">
            Category
          </div>
          <div className="col-start-3 sm:col-start-4 font-bold text-xl">
            Parent
          </div>
          <div className="col-span-2 col-start-5 text-center hidden sm:flex items-center font-bold text-xl">
            Description
          </div>
          <div className="col-start-4 sm:col-start-7 font-bold text-xl text-center">
            Actions
          </div>
        </div>
        {/* //Content */}
        {isLoading ? (
          <>
            <CategoryRowSkeleton />
            <CategoryRowSkeleton />
            <CategoryRowSkeleton />
          </>
        ) : error ? (
          <div className="grid grid-cols-4 sm:grid-cols-7  items-center">
            <div className="col-span-4 sm:col-span-7 py-4">
              <p className="text-center font-bold text-lg">{error}</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-7 items-center">
            <div className="col-span-4 sm:col-span-7 py-4">
              <p className="text-center font-bold text-lg">Empty data</p>
            </div>
          </div>
        ) : (
          data.map((category, index) => (
            <div
              key={`${category.id}_${category.name}`}
              className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
            >
              <div className="col-span-2 sm:col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15">
                    {category.image && (
                      <Image
                        width={60}
                        height={50}
                        alt={category.name}
                        src={category.image.url}
                        priority={index < 3}
                        placeholder="empty"
                        className="object-fill"
                      />
                    )}
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {category.name}
                  </p>
                </div>
              </div>
              <div className="col-start-3 sm:col-start-4 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {category.parent ? (
                    <Link href={`/admin/categories/${category.parentId}`}>{category.parent.name}</Link>
                  ) : (<span>No Parent</span>)}
                </p>
              </div>
              <div className="col-span-2 col-start-5 hidden sm:flex items-center gap-2">
                <p className="w-full">{category.description}</p>
              </div>
              <div className="col-start-4 sm:col-start-7 gap-2 flex items-center">
                <div></div> {/* // TODO Actions buttons */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
