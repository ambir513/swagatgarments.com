"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubcategorySearch } from "./subcategory-search";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Preahvihear } from "next/font/google";
import { createProduct } from "../actions";
import { addProductDetails } from "../type";
import { ProductCategories } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const colorList = [
  { name: "White", tailwindcss: "bg-white" },
  { name: "Black", tailwindcss: "bg-black" },
  { name: "Gray", tailwindcss: "bg-gray-700" },
  { name: "Red", tailwindcss: "bg-red-500" },
  { name: "Blue", tailwindcss: "bg-blue-600" },
  { name: "Green", tailwindcss: "bg-green-600" },
  { name: "Yellow", tailwindcss: "bg-yellow-400" },
  { name: "Purple", tailwindcss: "bg-purple-600" },
  { name: "Orange", tailwindcss: "bg-orange-500" },
  { name: "Rose", tailwindcss: "bg-rose-500" },
  { name: "Brown", tailwindcss: "bg-amber-900" },
];

export function AddProducts() {
  const [value, setValue] = useState("white");
  const [category, setCategory] = useState("");
  const [productDetail, setProductDetail] = useState<{
    name: string;
    description: string;
    code: string;
    stock: string;
    variantStock: string;
    price: string;
    brandName: string;
    amount: string;
  }>({
    name: "",
    description: "",
    code: "",
    stock: "",
    variantStock: "",
    price: "",
    brandName: "",
    amount: "",
  });
  const [subCategory, setSubCategory] = useState<[{ name: ""; sizes: [] }]>([
    { name: "", sizes: [] },
  ]);
  const [images, setImages] = useState<string[]>([]);
  const route = useRouter();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(subCategory);
  }, [subCategory]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    console.log(selectedSizes);
  };

  const handleSubmit = async () => {
    if (!productDetail.name) return null;
    setIsLoading(true);
    const data = {
      name: productDetail.name,
      description: productDetail.description,
      code: productDetail.code,
      amount: Number(productDetail.amount),
      brandName: productDetail.brandName,
      subCategories: productDetail.stock,
      stock: Number(productDetail.stock),
      categories: category as ProductCategories,
      subCategory: subCategory[0].name,
      variants: [
        {
          size: [...selectedSizes],
          color: value,
          images: [...images],
          stock: Number(productDetail.variantStock),
          price: Number(productDetail.price),
        },
      ],
    };

    const products = await createProduct(data);
    setIsLoading(false);
    if (products.status) {
      toast.success(products.message);
      route.push("/dashboard/product-list");
    } else {
      toast.error(products.message);
    }
  };
  return (
    <div className="mx-auto max-w-4xl">
      <div
        className="
        grid  lg:grid-cols-2 gap-5 m-5
     "
      >
        <Card className=" w-full">
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
            <CardDescription>Enter product details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      autoComplete="off"
                      placeholder="T-shirt"
                      value={productDetail.name}
                      onChange={(e) =>
                        setProductDetail((prev) => {
                          return {
                            ...prev,
                            name: e.target.value,
                          };
                        })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      autoComplete="off"
                      value={productDetail.description}
                      onChange={(e) =>
                        setProductDetail((prev) => {
                          return {
                            ...prev,
                            description: e.target.value,
                          };
                        })
                      }
                    />
                  </Field>
                  <Field orientation={"horizontal"}>
                    <Field>
                      <FieldLabel htmlFor="code">Code</FieldLabel>
                      <Input
                        id="code"
                        autoComplete="off"
                        value={productDetail.code}
                        onChange={(e) =>
                          setProductDetail((prev) => {
                            return {
                              ...prev,
                              code: e.target.value,
                            };
                          })
                        }
                      />
                      <FieldDescription>GIRMALSHOP</FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="code">Stock</FieldLabel>
                      <Input
                        id="code"
                        autoComplete="off"
                        type="number"
                        value={productDetail.stock}
                        onChange={(e) =>
                          setProductDetail((prev) => {
                            return {
                              ...prev,
                              stock: e.target.value,
                            };
                          })
                        }
                      />
                      <FieldDescription>Optional</FieldDescription>
                    </Field>
                  </Field>
                  <Field orientation={"horizontal"}>
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MAN">Man</SelectItem>
                          <SelectItem value="WOMAN">Woman</SelectItem>
                          <SelectItem value="KIDS">Kids</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Sub-Category</FieldLabel>
                      <SubcategorySearch
                        category={category}
                        setSubCategory={setSubCategory}
                      />
                    </Field>
                  </Field>
                  <Field orientation={"horizontal"}>
                    <Field>
                      <FieldLabel>Brand Name</FieldLabel>
                      <Input
                        placeholder="Company name"
                        value={productDetail.brandName}
                        onChange={(e) =>
                          setProductDetail((prev) => {
                            return {
                              ...prev,
                              brandName: e.target.value,
                            };
                          })
                        }
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Amount</FieldLabel>
                      <Input
                        type="number"
                        placeholder="XXXX"
                        value={productDetail.amount}
                        onChange={(e) =>
                          setProductDetail((prev) => {
                            return {
                              ...prev,
                              amount: e.target.value,
                            };
                          })
                        }
                      />
                    </Field>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </CardContent>
        </Card>
        <Card className=" h-fit w-full">
          <CardHeader>
            <CardTitle>Add Variants</CardTitle>
            <CardDescription>
              About colors, sizes, prices and images
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <Field className="flex justify-between items-center flex-row">
              <Field>
                <FieldLabel htmlFor="code">Stock</FieldLabel>
                <Input
                  id="code"
                  autoComplete="off"
                  type="number"
                  value={productDetail.variantStock}
                  onChange={(e) =>
                    setProductDetail((prev) => {
                      return {
                        ...prev,
                        variantStock: e.target.value,
                      };
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="code">Price</FieldLabel>
                <Input
                  id="code"
                  autoComplete="off"
                  type="number"
                  value={productDetail.price}
                  onChange={(e) =>
                    setProductDetail((prev) => {
                      return {
                        ...prev,
                        price: e.target.value,
                      };
                    })
                  }
                />
              </Field>
            </Field>
            <Field>
              <FieldLabel>Colors</FieldLabel>
              <FieldContent>
                <RadioGroup
                  value={value}
                  onValueChange={setValue}
                  className="flex gap-3 flex-wrap"
                >
                  {colorList.map((color) => (
                    <div
                      key={color.name}
                      className={cn(
                        "relative w-6 h-6 rounded-full cursor-pointer",
                        color.tailwindcss,
                        value === color.name &&
                          "ring-2 ring-offset-2 ring-blue-600"
                      )}
                    >
                      <RadioGroupItem
                        value={color.name}
                        id={color.name.toLowerCase()}
                        className="absolute inset-0 opacity-0  w-6 h-6 cursor-pointer"
                      />
                    </div>
                  ))}
                </RadioGroup>
              </FieldContent>
            </Field>

            <Field>
              Sizes
              <FieldContent className="flex flex-row flex-wrap items-center gap-3">
                {subCategory?.map((item: { name: string; sizes: string[] }) => {
                  if (item.sizes.length === 0) {
                    return (
                      <p
                        className="text-sm text-muted-foreground"
                        key={item.name}
                      >
                        Select the Sub-Category first
                      </p>
                    );
                  } else {
                    return item.sizes.map((i) => (
                      <FieldLabel htmlFor={i} key={i}>
                        <Checkbox
                          checked={selectedSizes.includes(i)}
                          onCheckedChange={() => toggleSize(i)}
                        />
                        {i}
                      </FieldLabel>
                    ));
                  }
                })}
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Upload Images</FieldLabel>
              <FieldContent className="grid grid-cols-1 items-center gap-4">
                {images.length < 4 && (
                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary-sign"
                    options={{
                      multiple: true,
                      maxFiles: 4 - images.length,
                      resourceType: "image",
                      folder: "ecommerce",
                      cropping: true,
                      croppingAspectRatio: 1,
                    }}
                    onSuccess={(result: any) => {
                      const info = result?.info;
                      const urls = Array.isArray(info)
                        ? info.map((item) => item.secure_url)
                        : [info?.secure_url];

                      setImages((prev) => [...prev, ...urls].slice(0, 4));
                      document.body.style.overflow = "auto";
                    }}
                    onError={() => {
                      document.body.style.overflow = "auto";
                    }}
                  >
                    {({ open }) => (
                      <Button
                        disabled={isLoading}
                        onClick={() => {
                          open();
                          document.body.style.overflow = "hidden";
                        }}
                        className="text-white"
                      >
                        Upload up to 4 Images
                      </Button>
                    )}
                  </CldUploadWidget>
                )}

                {/* Image previews (show for any uploaded image) */}
                <div className="flex flex-row flex-wrap gap-3">
                  {images.length > 0 && (
                    <div className="flex gap-4 flex-wrap">
                      {images.map((url, i) => (
                        <div key={i} className="relative">
                          <img
                            src={url}
                            alt={`Uploaded ${i + 1}`}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setImages((prev) =>
                                prev.filter((_, index) => index !== i)
                              )
                            }
                            className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FieldContent>
            </Field>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full text-white"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              Add Product
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
