"use server";

import { db } from "@/db";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      include: {
        images: {
          select: {
            image1: true,
          },
        },
        variants: {
          select: {
            color: true,
            size: true,
            price: true,
          },
        },
      },
    });

    const formatProduct = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      code: p.code,
      bandName: p.bandName,
      subCategories: p.subCategories,
      categories: p.categories,
      status: p.status,
      stock: p.stock,
      amount: p.amount,
      images: p.images?.image1,
      variants: p.variants,
    }));

    return {
      status: true,
      message: "products get successfully",
      products: formatProduct,
    };
  } catch (error: unknown) {
    console.log(error);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "something went wrong";
    return { message, status: false, products: [] };
  }
};
