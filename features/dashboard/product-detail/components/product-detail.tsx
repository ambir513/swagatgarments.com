"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("MD");
  const [selectedColor, setSelectedColor] = useState("cyan");

  const productImages = [
    "/black-sweatpants.jpg",
    "/black-sweatpants-side-view.jpg",
    "/black-sweatpants-detail.jpg",
    "/red-baseball-cap.png",
  ];

  const reviews = [
    {
      id: 1,
      author: "Mark P.",
      avatar: "MP",
      rating: 3.2,
      stars: 3,
      date: "5 days ago",
      title: "Decent but could be better",
      content:
        "The product is okay, but I expected more for the price. A few minor flaws, but overall, it's acceptable.",
    },
    {
      id: 2,
      author: "Jessica K.",
      avatar: "JK",
      rating: 3.2,
      stars: 3,
      date: "2 weeks ago",
      title: "Beautiful design",
      content:
        "I love the sleek design and the ease of use. Haven't come across such a stylish product in a long time. Highly satisfied!",
    },
    {
      id: 3,
      author: "Michael B.",
      avatar: "MB",
      rating: 3.2,
      stars: 3,
      date: "4 days ago",
      title: "Satisfied with my purchase",
      content:
        "I'm really happy with this purchase. The quality is great, and it works just as described. No complaints so far!",
    },
    {
      id: 4,
      author: "Anna M.",
      avatar: "AM",
      rating: 3.2,
      stars: 3,
      date: "6 days ago",
      title: "Could be improved",
      content:
        "The product works, but there's room for improvement. It does the job, but the build quality feels a bit cheap.",
    },
    {
      id: 5,
      author: "Chris T.",
      avatar: "CT",
      rating: 3.2,
      stars: 3,
      date: "1 day ago",
      title: "Great for everyday use",
      content:
        "Perfect for daily use. It's simple, efficient, and does exactly what it promises. Definitely worth the money.",
    },
    {
      id: 6,
      author: "Lisa G.",
      avatar: "LG",
      rating: 3.2,
      stars: 3,
      date: "3 weeks ago",
      title: "Not worth the price",
      content:
        "The product does the job, but I feel it's overpriced for what it offers. There are better options available at a similar price.",
    },
    {
      id: 7,
      author: "David L.",
      avatar: "DL",
      rating: 3.2,
      stars: 3,
      date: "1 month ago",
      title: "Highly functional and stylish",
      content:
        "This product is both functional and stylish. It fits perfectly with my needs, and I'm really impressed with the overall quality.",
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 17 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 4 },
    { stars: 1, percentage: 2 },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Acme Prism T-Shirt
            </h1>
            <div className="mt-2 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:gap-4 sm:text-sm">
              <span>
                Seller: <span className="text-foreground">Poetic Fashion</span>
              </span>
              <span>
                Published: <span className="text-foreground">20 Oct, 2024</span>
              </span>
              <span>
                SKU: <span className="text-foreground">WH0000YM4</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Edit2 className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:gap-8 sm:p-6 lg:grid-cols-3">
        {/* Left Column - Product Images */}
        <div className="lg:col-span-1">
          <div className="relative mb-4 overflow-hidden rounded-lg bg-muted">
            <img
              src={productImages[currentImageIndex] || "/placeholder.svg"}
              alt="Product"
              className="h-64 w-full object-cover sm:h-96"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20 ${
                  idx === currentImageIndex ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column - Product Details */}
        <div className="lg:col-span-1">
          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <Card className="p-3 sm:p-4">
              <div className="text-xs text-muted-foreground sm:text-sm">
                Price
              </div>
              <div className="text-lg font-bold sm:text-2xl">$120.40</div>
            </Card>
            <Card className="p-3 sm:p-4">
              <div className="text-xs text-muted-foreground sm:text-sm">
                No. of Orders
              </div>
              <div className="text-lg font-bold sm:text-2xl">250</div>
            </Card>
            <Card className="p-3 sm:p-4">
              <div className="text-xs text-muted-foreground sm:text-sm">
                Available Stocks
              </div>
              <div className="text-lg font-bold sm:text-2xl">2,550</div>
            </Card>
            <Card className="p-3 sm:p-4">
              <div className="text-xs text-muted-foreground sm:text-sm">
                Total Revenue
              </div>
              <div className="text-lg font-bold sm:text-2xl">$45,938</div>
            </Card>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Description:</h3>
            <p className="text-sm text-muted-foreground">
              Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton.
              Material composition is 100% organic cotton.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Key Features:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Industry-leading noise cancellation</li>
              <li>• 30-hour battery life</li>
              <li>• Touch sensor controls</li>
              <li>• Speak-to-chat technology</li>
            </ul>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Colors:</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedColor("cyan")}
                className={`h-8 w-8 rounded-full bg-cyan-400 ring-2 transition-all ${
                  selectedColor === "cyan"
                    ? "ring-foreground"
                    : "ring-transparent"
                }`}
              />
              <button
                onClick={() => setSelectedColor("purple")}
                className={`h-8 w-8 rounded-full bg-purple-400 ring-2 transition-all ${
                  selectedColor === "purple"
                    ? "ring-foreground"
                    : "ring-transparent"
                }`}
              />
              <button
                onClick={() => setSelectedColor("pink")}
                className={`h-8 w-8 rounded-full bg-pink-400 ring-2 transition-all ${
                  selectedColor === "pink"
                    ? "ring-foreground"
                    : "ring-transparent"
                }`}
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Sizes:</h3>
            <div className="flex flex-wrap gap-2">
              {["SM", "MD", "LG", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded border px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1 gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </Button>
          </div>
        </div>

        {/* Right Column - Product Info & Reviews */}
        <div className="lg:col-span-1">
          {/* Product Info */}
          <Card className="mb-6 p-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">T-Shirt</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium">Tommy Hilfiger</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Color</span>
                <span className="font-medium">Purple</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weight</span>
                <span className="font-medium">140 Gr</span>
              </div>
            </div>
          </Card>

          {/* Rating Summary */}
          <div className="mb-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold">Reviews</h3>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 w-full sm:w-auto bg-transparent"
              >
                <Star className="h-4 w-4" />
                Submit Review
              </Button>
            </div>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[...Array(2)].map((_, i) => (
                  <Star key={i + 3} className="h-4 w-4 text-muted" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.3 (12 reviews)
              </span>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div
                  key={item.stars}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-12 text-muted-foreground">
                    {item.stars} stars
                  </span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-muted-foreground"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-muted-foreground">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-border px-4 py-6 sm:px-6 sm:py-8">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.avatar}`}
                    />
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm sm:text-base">
                      {review.author}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.stars
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <h4 className="mb-2 font-medium text-sm">{review.title}</h4>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <Button variant="outline">Load more...</Button>
        </div>
      </div>
    </div>
  );
};
