import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const products = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    description:
      "Soft, breathable 100% organic cotton with a perfect fit for everyday wear.",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    link: "#",
  },
  {
    id: 2,
    title: "Slim Fit Denim Jeans",
    description:
      "Classic denim with a modern slim fit. Durable and comfortable for all-day wear.",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    link: "#",
  },
  {
    id: 3,
    title: "Wool Blend Sweater",
    description:
      "Luxurious wool blend sweater with superior warmth and elegant styling.",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
    link: "#",
  },
  {
    id: 4,
    title: "Linen Summer Shirt",
    description:
      "Lightweight linen shirt perfect for warm weather. Breathable and stylish.",
    badge: "Limited Edition",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    link: "#",
  },
  {
    id: 5,
    title: "Casual Chino Pants",
    description:
      "Versatile chino pants in neutral tones. Perfect for casual or smart-casual looks.",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
    link: "#",
  },
  {
    id: 6,
    title: "Leather Jacket",
    description:
      "Premium leather jacket with timeless design. A wardrobe essential for any season.",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    link: "#",
  },
];

export function ProductSection() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Curated Collection
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Featured Garments
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our handpicked selection of premium clothing designed for
            comfort, style, and quality.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  w-fit  mx-auto">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg p-0 w-[300px] active:shadow-lg gap-0 transition-shadow duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-muted h-40 sm:h-40 sm:w-75 w-75">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 active:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">{product.badge}</Badge>
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col gap-y-2 flex-grow">
                  <h3 className="text-lg font-semibold  line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-grow line-clamp-3">
                    {product.description}
                  </p>
                  <Button variant="ghost" className="w-fit justify-start">
                    View details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
