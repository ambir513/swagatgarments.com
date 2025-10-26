"use client";

import { useState } from "react";
import { ImageIcon, Upload, Plus, RotateCw, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { createProduct } from "../actions";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

// Status options
export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  OUTOFSTOCK = "OUTOFSTOCK",
  CLOSEDOFSALE = "CLOSEDOFSALE",
}

// Categories options
export type Category = "MAN" | "WOMAN" | "KIDS";

export const AddProducts = () => {
  const Route = useRouter();
  const [productDetail, setProductDetail] = useState<{
    name: string;
    description: string;
    code: string;
    amount: string;
    band_name: string;
    stock: string;
    status: ProductStatus;
    categories: Category;
    sub_categories: string;
  }>({
    name: "",
    description: "",
    code: "",
    amount: "",
    band_name: "",
    stock: "",
    status: ProductStatus.ACTIVE, // default value
    categories: "MAN", // default value
    sub_categories: "",
  });

  const [variants, setVariants] = useState<
    { color: string; size: string; price: string }[]
  >([
    {
      color: "",
      size: "",
      price: "",
    },
  ]);
  const [colors, setColors] = useState([1]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: string, value: any) => {
    setProductDetail((prev) => ({ ...prev, [field]: value }));
  };

  const [images, setImages] = useState<string[]>([]);

  const statusOptions = [
    { value: "ACTIVE", label: "Active", color: "bg-green-500" },
    { value: "INACTIVE", label: "Inactive", color: "bg-gray-500" },
    { value: "OUTOFSTOCK", label: "Out of Stock", color: "bg-red-500" },
    { value: "CLOSEDOFSALE", label: "Closed of Sale", color: "bg-orange-500" },
  ];

  const currentStatus = statusOptions.find(
    (s) => s.value === productDetail.status
  );

  const handleSubmit = async () => {
    if (productDetail.name === "" || images.length == 0) {
      toast.error("All fields are mandatory");
      return null;
    }
    setIsLoading(true);
    let image = images.map((img) => img.split("/").splice(-1).join(""));

    const product = await createProduct({
      products: { ...productDetail },
      images: image,
      variants: variants as any,
    });
    setIsLoading(false);
    if (product.status) {
      toast.success(product.message);
      Route.push("/dashboard/product-list");
    } else {
      toast.error(product.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center 2xl:items-center flex-col 2xl:mx-24">
      {/* Header */}
      <div>
        <div className="flex flex-col mx-3 mt-4 gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              className="flex-1 sm:flex-none bg-primary text-white hover:bg-primary/90 text-sm sm:text-base"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              <span>Create publish</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:w-fit">
        <div className="flex flex-col lg:gap-6">
          {/* Left Column (mobile: full width, lg: 2/3) */}
          <div className="space-y-4 lg:col-span-2 lg:space-y-6">
            {/* Product Details Form */}
            <Card className="border-border bg-card">
              <CardHeader className="px-4  sm:px-6 ">
                <CardTitle className=" text-lg sm:text-base text-foreground">
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-sm text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={productDetail.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="code" className="text-sm text-foreground">
                      Code
                    </Label>
                    <Input
                      id="code"
                      placeholder="Secret code"
                      value={productDetail.code}
                      onChange={(e) =>
                        handleInputChange("code", e.target.value)
                      }
                      className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="barcode"
                      className="text-sm text-foreground"
                    >
                      No of Stock
                    </Label>
                    <Input
                      id="barcode"
                      type="number"
                      placeholder="10"
                      value={productDetail.stock}
                      onChange={(e) =>
                        handleInputChange("stock", e.target.value)
                      }
                      className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm text-foreground"
                  >
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    value={productDetail.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="mt-2 min-h-24 sm:min-h-32 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    Set a description to the product for better visibility.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-3">
                  <div className="flex flex-col gap-y-2">
                    <Label
                      htmlFor="categories"
                      className="text-sm text-foreground"
                    >
                      Categories
                    </Label>
                    <Select
                      value={productDetail.categories}
                      onValueChange={(value) =>
                        handleInputChange("categories", value)
                      }
                    >
                      <SelectTrigger className="flex-1 bg-muted border-border text-foreground text-sm w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border ">
                        <SelectItem value="MAN">Man</SelectItem>
                        <SelectItem value="WOMAN">Woman</SelectItem>
                        <SelectItem value="KIDS">Kids</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Sub Category */}
                  <div className="flex  flex-col gap-y-2">
                    <Label
                      htmlFor="sub_categories"
                      className="text-sm text-foreground"
                    >
                      Sub-Categories
                    </Label>
                    <Input
                      id="sub_categories"
                      placeholder="Ex. T-shirt"
                      value={productDetail.sub_categories}
                      onChange={(e) =>
                        handleInputChange("sub_categories", e.target.value)
                      }
                      className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-3">
                  <div className="">
                    <Label
                      htmlFor="basePrice"
                      className="text-sm text-foreground"
                    >
                      Amount
                    </Label>
                    <Input
                      id="Amount"
                      placeholder="₹XXXX"
                      type="number"
                      value={productDetail.amount}
                      onChange={(e) =>
                        handleInputChange("amount", Number(e.target.value))
                      }
                      className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <Label
                      htmlFor="basePrice"
                      className="text-sm text-foreground"
                    >
                      Status
                    </Label>
                    <Select
                      value={productDetail.status}
                      onValueChange={(value) =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger className="bg-muted border-border text-foreground text-sm w-full">
                        <div className="flex items-center gap-2">
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${option.color}`}
                              />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Set the product status.
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col justify-between">
                  <div className="">
                    <Label
                      htmlFor="BandName"
                      className="text-sm text-foreground"
                    >
                      Band Name
                    </Label>
                    <Input
                      id="BandName"
                      placeholder="Ex. Essa"
                      value={productDetail.band_name}
                      onChange={(e) =>
                        handleInputChange("band_name", e.target.value)
                      }
                      className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground text-sm lg:w-[335px]"
                    />
                  </div>
                  {images.length === 4 ? (
                    <div className="mt-5 flex flex-wrap gap-2 mx-5">
                      {images.map((img, i) => (
                        <Image
                          src={img}
                          alt={`Uploaded ${i + 1}`}
                          width={100}
                          height={100}
                          key={img}
                          className="rounded-2xl "
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <CldUploadWidget
                        signatureEndpoint="/api/cloudinary-sign"
                        options={
                          {
                            multiple: true,
                            maxFiles: 4,
                            resourceType: "image",
                            folder: "ecommerce",
                          } as any
                        }
                        onSuccess={(result: any) => {
                          const url = result?.info?.secure_url;
                          if (url)
                            setImages((prev) => [...prev, url].slice(0, 4));

                          document.body.style.overflow = "auto";
                        }}
                        onError={() => {
                          document.body.style.overflow = "auto";
                        }}
                      >
                        {({ open }) => (
                          <Button
                            onClick={() => {
                              open();
                              document.body.style.overflow = "hidden";
                            }}
                            className="text-white mt-7"
                          >
                            Upload 4 Signed Images
                          </Button>
                        )}
                      </CldUploadWidget>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Variants Section */}
            <Card className="border-border bg-card">
              <CardHeader className="px-4 sm:px-6 ">
                <CardTitle className="text-lg sm:text-base text-foreground">
                  Total Variants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
                {/* Variant Rows */}
                {colors.map((item, index) => (
                  <div className="flex flex-col gap-y-2" key={index}>
                    Variants {index + 1}
                    <div className="flex flex-col gap-y-3 border-t-1 py-4">
                      {[1, 2, 3].map((row, idx) => (
                        <div
                          key={row}
                          className="grid grid-cols-1 w-full gap-3 sm:grid-cols-3 sm:gap-4"
                        >
                          <p className="text-sm">
                            {idx === 1 ? "Size" : idx === 2 ? "Price" : "Color"}
                          </p>
                          <Input
                            placeholder={
                              idx === 1
                                ? "S, M, L, XL or 28, 30"
                                : idx === 2
                                ? "₹XXXX"
                                : "Yellow"
                            }
                            type={idx === 2 ? "number" : "text"}
                            className="bg-muted grid-cols-3 w-full border-border text-foreground placeholder:text-muted-foreground text-sm"
                            value={
                              idx === 1
                                ? variants[index].size
                                : idx === 2
                                ? variants[index].price
                                : variants[index].color
                            }
                            onChange={(e) =>
                              setVariants((prev) =>
                                prev.map((v, i) =>
                                  i === index
                                    ? {
                                        ...v,
                                        ...(idx === 1
                                          ? { size: e.target.value }
                                          : idx === 2
                                          ? { price: e.target.value }
                                          : { color: e.target.value }),
                                      }
                                    : v
                                )
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="mt-4 w-full border-border text-foreground hover:bg-muted bg-transparent text-sm"
                  onClick={() => {
                    setColors((prev) => [...prev, 2]);
                    setVariants((prev) => [
                      ...prev,
                      { color: "", size: "", price: "" },
                    ]);
                  }}
                >
                  <Plus />
                  Add Variant
                </Button>
                <Button
                  variant="destructive"
                  className="w-full border-border text-foreground hover:bg-muted bg-transparent text-sm"
                  onClick={() => {
                    setColors((prev) =>
                      prev.filter((item, index) => index - 1)
                    );
                    setVariants((prev) =>
                      prev.filter((item, index) => index - 1)
                    );
                  }}
                >
                  <Trash />
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
