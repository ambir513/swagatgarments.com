// import { getProducts } from "@/features/dashboard/product-list/actions";
// import { create } from "zustand";

// export interface ProductVariant {
//   color: string;
//   price: number;
//   size: string;
// }

// export interface ProductData {
//   id: string;
//   name: string;
//   description: string;
//   amount: number;
//   bandName: string;
//   stock: number;
//   status: "ACTIVE" | "INACTIVE" | "OUTOFSTOCK" | "CLOSEDOFSALE";
//   categories: "MAN" | "WOMAN" | "KIDS";
//   subCategories: string;
//   images?: string;
//   variants: ProductVariant[];
// }

// interface ProductDetils {
//   product: ProductData[] | [];
//   fetchProduct: (product: ProductData) => void;
//   clearProduct: () => void;
// }

// export const useProductDetails = create<ProductDetils>((set) => ({
//   product: [] as ProductData[],
//   fetchProduct: async (product) => (
//     // const products = await getProducts()
//   ),
//   clearProduct: () => set({ product: [] }),
// }));
