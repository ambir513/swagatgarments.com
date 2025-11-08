import { ProductCategories } from "@prisma/client";

export interface addProductDetails {
  name: string;
  description: string;
  code: string;
  amount: number;
  brandName: string;
  subCategories: string;
  stock: number;
  categories: ProductCategories;
  variants: {
    color: string;
    size: string[];
    stock: number;
    price: number;
    images: string[];
  }[];
}
