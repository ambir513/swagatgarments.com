"use server";

import { db } from "@/db";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      include: {
        variants: true,
      },
    });

    return {
      status: true,
      message: "products get successfully",
      products,
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

export const deleteProduct = async (productId: string) => {
  try {
    await db.product.delete({
      where: { id: productId },
    });
    return {
      status: true,
      message: "Product deleted successfully",
    };
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
};
