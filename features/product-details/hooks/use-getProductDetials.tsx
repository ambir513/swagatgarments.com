import { useEffect, useState } from "react";
import { Product } from "../type";
import { getProductDetails } from "../actions";

export function useGetProductDetails(id: string) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const product = await getProductDetails(id);

        if (product?.status) {
          setData(product.products as Product);
          setError(null);
        } else {
          setData(null);
          setError(product?.message || "Failed to fetch product");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { loading, error, data };
}
