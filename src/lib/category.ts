import prisma from "./db";

/**
 * Calculate the category depth
 * @param parent - Parent category
 * @returns Category depth (max 4)
 */
export const calculateCategoryDepth = (
  parent: Awaited<ReturnType<typeof validateParentCategory>>
) => {
  return parent ? Math.min((parent.depth ?? 0) + 1, 4) : 0; // Max depth is 4
};

/**
 * Validate and process parent category
 * @param parentId - Parent category ID
 * @returns Validated parent category or null
 */
export const validateParentCategory = async (parentId: number | undefined) => {
  if (!parentId) return null;
  const parent = await prisma.category.findUnique({
    where: { id: parentId },
    select: { id: true, depth: true },
  });
  if (!parent) {
    throw new Error("Category parent does not exist!");
  }
  return parent;
};
