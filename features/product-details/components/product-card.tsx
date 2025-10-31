"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Product } from "../type";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

export function ProductCard({ data }: { data: Product | null }) {
  const [currentVariants, setCurrentVariants] = useState({
    image: data?.images?.image1,
    size: data?.variants?.map((v) => v.size.split(","))[0],
    price: data?.variants?.map((v) => v.price)[0],
    color: data?.variants?.map((v) => v.color)[0],
  });

  const [selectedSize, setSelectedSize] = useState("MD");
  const [selectedColor, setSelectedColor] = useState(data?.variants[0]?.color);

  const productImages = [
    data?.images.image1,
    data?.images.image2,
    data?.images.image3,
    data?.images.image4,
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 17 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 4 },
    { stars: 1, percentage: 2 },
  ];

  console.log(currentVariants.size);

  return (
    <div className="max-w-3xl mx-auto w-full mt-10">
      <div className="flex flex-col gap-y-3 mx-3">
        <div className="flex md:flex-row flex-col md:gap-x-9">
          {/** Product Images */}
          <div className="flex flex-col gap-y-2 w-fit">
            <div className="">
              <CldImage
                width="600"
                height="600"
                crop={"fill"}
                src={process.env.NEXT_PUBLIC_IMG_URL! + currentVariants.image}
                sizes="100vw"
                removeBackground
                background="white"
                alt=""
                className="rounded-lg border-2 border-zinc-300"
              />
            </div>
            <div className="flex sm:mx-0 mx-4 items-center gap-x-3 w-[300px]">
              {productImages.map((id, index) => {
                return (
                  <CldImage
                    onClick={() =>
                      setCurrentVariants((prev) => ({
                        price: data?.variants[index]?.price,
                        color: data?.variants[index]?.color,
                        size: data?.variants[index]?.size.split(","),
                        image: id,
                      }))
                    }
                    className="cursor-pointer rounded-lg border-2 border-zinc-300"
                    key={index}
                    width="70"
                    height="70"
                    crop={"fill"}
                    src={process.env.NEXT_PUBLIC_IMG_URL! + id}
                    sizes="100vw"
                    removeBackground
                    background="white"
                    alt=""
                  />
                );
              })}
            </div>
          </div>
          {/** Product Details */}
          <div className="flex flex-col gap-y-2 mb-3 w-full">
            <h1 className="text-xl font-semibold">{data?.name}</h1>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {data?.description}
              </p>
            </div>

            {/* Colors */}
            <div className=" flex flex-wrap gap-x-4">
              <h3 className="mb-3 font-semibold">Colors:</h3>
              <div className="flex gap-3">
                {data?.variants.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => {
                      const indexId = data?.variants.findIndex(
                        (v) => v.color === variant.color
                      );

                      const image = (data?.images as any)[
                        `image${indexId! + 1}`
                      ];
                      setCurrentVariants((prev) => ({
                        price: data?.variants[indexId!]?.price,
                        color: data?.variants[indexId!]?.color,
                        size: data?.variants[indexId!]?.size.split(","),
                        image: image,
                      }));
                    }}
                    className={cn(
                      `h-8 w-8 rounded-full  ring-2 transition-all `,
                      variant.color === currentVariants.color
                        ? (currentVariants.color === "Black" && "bg-black") ||
                            (currentVariants.color === "Red" && "bg-red-500") ||
                            (currentVariants.color === "Blue" &&
                              "bg-blue-500") ||
                            (currentVariants.color === "White" && "bg-white") ||
                            (currentVariants.color === "Green" &&
                              "bg-green-500")
                        : (variant?.color === "Black" && "bg-black") ||
                            (variant?.color === "Red" && "bg-red-500") ||
                            (variant?.color === "Blue" && "bg-blue-500") ||
                            (variant?.color === "White" && "bg-white") ||
                            (variant?.color === "Green" && "bg-green-500"),
                      currentVariants.color === variant.color
                        ? "ring-foreground"
                        : "ring-transparent"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="mb-3 font-semibold">Sizes:</h3>
              <div className="flex flex-wrap gap-2">
                {currentVariants.size?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded border px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col mb-5">
              <h1 className="text-lg font-semibold">
                Rs.{" "}
                {
                  data?.variants?.find((v) => v.color === currentVariants.color)
                    ?.price
                }
              </h1>
              <p className="text-muted-foreground text-sm line-through">
                Rs. {data?.amount}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1 gap-2 text-white">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <div className="flex md:flex-row flex-col gap-x-9 ">
              {/* Product Info */}
              <Card className=" p-4 md:w-[300px] h-fit">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">
                      {data?.categories.toLocaleLowerCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sub-Category</span>
                    <span className="font-medium">
                      {data?.subCategories?.toLocaleLowerCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">{data?.bandName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Color</span>
                    <div className="flex gap-x-1">
                      {data?.variants?.map((v, index) => (
                        <p key={v.color}>
                          <span className="font-medium">{v.color}</span>
                          <span>{index > 0 && ","}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sizes</span>
                    {data?.variants?.map(
                      (v, index) =>
                        index == 0 && (
                          <p key={v.size}>
                            <span className="font-medium">{v.size}</span>
                            <span>{index > 0 && ","}</span>
                          </p>
                        )
                    )}
                  </div>
                </div>
              </Card>
              <div className="mb-6 w-fit sm:w-[400px]">
                <div className="">
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
          </div>
        </div>
      </div>
    </div>
  );
}
