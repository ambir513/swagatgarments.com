"use client";
import { useGetProductDetails } from "../hooks/use-getProductDetials";
import { ProductCard } from "./product-card";

const ProductDetails = ({ id }: { id: string }) => {
  const { loading, error, data } = useGetProductDetails(id);
  if (loading) return <div>Loading...</div>;
  console.log(data);
  return <ProductCard data={data} />;
};

export default ProductDetails;
