export interface ProductVariant {
  color: string;
  price: number;
  size: string;
}
export interface Images {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}
export interface ProductData {
  name: string | undefined;
  description: string | undefined;
  code: string | undefined;
  amount: number | undefined;
  bandName: string | undefined;
  stock: number | undefined;
  status: "ACTIVE" | "INACTIVE" | "OUTOFSTOCK" | "CLOSEDOFSALE";
  categories: "MAN" | "WOMAN" | "KIDS";
  subCategories: string | undefined;
  images: Images;
  variants: ProductVariant[];
}

export interface Product extends ProductData {
  id: string | undefined;
}
