export interface ProductVariant {
  color: string;
  price: number;
  size: string;
}

export interface ProductData {
  name: string;
  description: string;
  code: string;
  amount: number;
  bandName: string;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "OUTOFSTOCK" | "CLOSEDOFSALE";
  categories: "MAN" | "WOMAN" | "KIDS";
  subCategories: string;
  images?: string;
  variants: ProductVariant[];
}

export interface Product extends ProductData {
  id: string;
}
