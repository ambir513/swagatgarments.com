"use server";
import { db } from "@/db";

export const createProduct = async ({ products, images, variants }: data) => {
  try {
    const product = await db.product.create({
      data: {
        name: products.name,
        description: products.description,
        amount: Number(products.amount),
        bandName: products.band_name,
        subCategories: products.sub_categories,
        categories: products.categories,
        status: products.status,
        stock: Number(products.stock),
        code: products.code,
      },
    });
    const productImages = await db.productImages.create({
      data: {
        productId: product.id,
        image1: images[0],
        image2: images[1],
        image3: images[2],
        image4: images[3],
      },
    });
    const productVariantsData = variants.map((v) => ({
      productId: product.id,
      color: v.color,
      price: Number(v.price),
      size: v.size,
    }));

    const productVariants = await db.variants.createMany({
      data: productVariantsData,
    });
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
