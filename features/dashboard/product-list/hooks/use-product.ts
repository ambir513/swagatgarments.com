"use client";

import { useState, useEffect } from "react";
import type { Product } from "../type";
import { getProducts } from "../actions";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        if (data.status) {
          setProducts(data.products);
          setError(null);
        } else {
          setError("Failed to fetch products");
          setProducts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
