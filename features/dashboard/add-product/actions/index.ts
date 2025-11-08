"use server";
import { db } from "@/db";
import { addProductDetails } from "../type";

export const createProduct = async (data: addProductDetails) => {
  try {
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        amount: Number(data.amount),
        categories: data.categories,
        subCategories: data.subCategories,
        brandName: data.brandName,
        code: data.code,
        stock: data.stock,
      },
    });

    const variants = await db.productVariants.createMany({
      data: {
        productId: product.id,
        color: data.variants[0].color,
        size: data.variants[0].size,
        images: data.variants[0].images,
        stock: data.variants[0].stock,
        price: data.variants[0].price,
      },
    });
    console.log(product);
    console.log(variants);

    return { message: "Product added Successfully", status: true };
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
