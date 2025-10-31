"use server";

import { db } from "@/db";

export async function getProductDetails(id: string) {
  try {
    const products = await db.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: {
          select: {
            image1: true,
            image2: true,
            image3: true,
            image4: true,
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
    const formatProduct = {
      id: products?.id,
      name: products?.name,
      description: products?.description,
      code: products?.code,
      bandName: products?.bandName,
      subCategories: products?.subCategories,
      categories: products?.categories,
      status: products?.status,
      stock: products?.stock,
      amount: products?.amount,
      images: products?.images,
      variants: products?.variants,
    };
    return { status: true, products: formatProduct };
  } catch (error: unknown) {
    console.log(error);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "something went wrong";
    return { message, status: false };
  }
}
