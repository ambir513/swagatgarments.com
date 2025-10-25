"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  CirclePlus,
  Tag,
  ChevronDown,
  Columns3,
  MoreHorizontal,
  Star,
  ArrowUpDown,
} from "lucide-react";
// import { AddProductSheet } from "./add-product-sheet";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  rating: number;
  status: "Active" | "Out Of Stock" | "Closed For Sale";
  image: string;
  description?: string;
  color?: string;
  subCategory?: string;
  brandName?: string;
  size?: string;
  amount?: number;
  offer?: string;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "HP Pavilion 16.1 Inch Gaming Laptop",
      price: 960.99,
      category: "Electronics",
      stock: 5,
      sku: "RCH45Q1A",
      rating: 4.9,
      status: "Active",
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "2",
      name: "Samsung SM-A21S Galaxy A21S",
      price: 350,
      category: "Electronics",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Active",
      image: "/modern-smartphone.png",
    },
    {
      id: "3",
      name: "Schwaiger KH510S 513 Buegelkopfhoerer",
      price: 300,
      category: "Electronics",
      stock: 27,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Out Of Stock",
      image: "/various-styles-of-pants.png",
    },
    {
      id: "4",
      name: "Ultimate Ears Wonderboom Bluetooth Speaker",
      price: 119.99,
      category: "Electronics",
      stock: 10,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Active",
      image: "/audio-speaker.png",
    },
    {
      id: "5",
      name: "Canon Pixma TS3350 Multifunction Printer",
      price: 439.5,
      category: "Electronics",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Closed For Sale",
      image: "/office-printer.png",
    },
    {
      id: "6",
      name: "Canon 4000D 18-55 MM III (Canon Eurasia Guaranteed)",
      price: 49.5,
      category: "Beauty",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Closed For Sale",
      image: "/vintage-camera-still-life.png",
    },
    {
      id: "7",
      name: "Lobwerk Lenovo Tab M10 TB-X605F",
      price: 49.5,
      category: "Beauty",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Closed For Sale",
      image: "/modern-tablet-display.png",
    },
    {
      id: "8",
      name: '2019 55" Q60R QLED 4K Quantum HDR Smart TV',
      price: 49.5,
      category: "Beauty",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Closed For Sale",
      image: "/various-styles-of-pants.png",
    },
    {
      id: "9",
      name: "Toshiba Canvio Partner 1 TB Portable",
      price: 49.5,
      category: "Beauty",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Closed For Sale",
      image: "/classic-bicycle.png",
    },
    {
      id: "10",
      name: "Projection Laser Presentation Controller 2.4ghz KI-QxO1",
      price: 49.5,
      category: "Beauty",
      stock: 25,
      sku: "MVCFH27F",
      rating: 4.65,
      status: "Closed For Sale",
      image: "/various-styles-of-pants.png",
    },
  ]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [visibleColumns, setVisibleColumns] = useState({
    productName: true,
    price: true,
    category: true,
    stock: true,
    sku: true,
    rating: true,
    status: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const itemsPerPage = 10;

  const handleAddProduct = (newProductData: {
    name: string;
    description: string;
    color: string;
    category: string;
    subCategory: string;
    brandName: string;
    size: string;
    stock: number;
    amount: number;
    price: number;
    offer: string;
  }) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: newProductData.name,
                price: newProductData.price,
                category: newProductData.category,
                stock: newProductData.stock,
                status: newProductData.stock > 0 ? "Active" : "Out Of Stock",
                description: newProductData.description,
                color: newProductData.color,
                subCategory: newProductData.subCategory,
                brandName: newProductData.brandName,
                size: newProductData.size,
                amount: newProductData.amount,
                offer: newProductData.offer,
              }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: newProductData.name,
        price: newProductData.price,
        category: newProductData.category,
        stock: newProductData.stock,
        sku: `SKU${Date.now().toString().slice(-6)}`,
        rating: 4.5,
        status: newProductData.stock > 0 ? "Active" : "Out Of Stock",
        image: "/diverse-products-still-life.png",
        description: newProductData.description,
        color: newProductData.color,
        subCategory: newProductData.subCategory,
        brandName: newProductData.brandName,
        size: newProductData.size,
        amount: newProductData.amount,
        offer: newProductData.offer,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const handleDuplicateProduct = (product: Product) => {
    const duplicatedProduct: Product = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} copy`,
      sku: `SKU${Date.now().toString().slice(-6)}`,
    };
    setProducts((prev) => [duplicatedProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(product.status);
      const matchesCategory =
        categoryFilter.length === 0 ||
        categoryFilter.includes(product.category);
      let matchesPrice = true;
      if (priceRange === "0-100") {
        matchesPrice = product.price >= 0 && product.price <= 100;
      } else if (priceRange === "100-200") {
        matchesPrice = product.price > 100 && product.price <= 200;
      } else if (priceRange === "200-500") {
        matchesPrice = product.price > 200 && product.price <= 500;
      } else if (priceRange === "500+") {
        matchesPrice = product.price > 500;
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesPrice;
    });
  }, [searchQuery, statusFilter, categoryFilter, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter, priceRange]);

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (
      paginatedProducts.length > 0 &&
      selectedProducts.length === paginatedProducts.length
    ) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    }
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground 2xl:mx-24 mx-auto">
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[300px] max-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-border bg-background text-foreground hover:bg-accent"
            >
              <CirclePlus className="mr-2 h-4 w-4" />
              Status
              {statusFilter.length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full bg-primary p-0 text-xs">
                  {statusFilter.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-border bg-background text-foreground">
            <DropdownMenuItem onClick={() => toggleStatusFilter("Active")}>
              <Checkbox
                checked={statusFilter.includes("Active")}
                className="mr-2 border-border"
              />
              Active
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toggleStatusFilter("Out Of Stock")}
            >
              <Checkbox
                checked={statusFilter.includes("Out Of Stock")}
                className="mr-2 border-border"
              />
              Out Of Stock
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toggleStatusFilter("Closed For Sale")}
            >
              <Checkbox
                checked={statusFilter.includes("Closed For Sale")}
                className="mr-2 border-border"
              />
              Closed For Sale
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-border bg-background text-foreground hover:bg-accent"
            >
              <Tag className="mr-2 h-4 w-4" />
              Category
              {categoryFilter.length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full bg-primary p-0 text-xs">
                  {categoryFilter.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-border bg-background text-foreground">
            <DropdownMenuItem
              onClick={() => toggleCategoryFilter("Electronics")}
            >
              <Checkbox
                checked={categoryFilter.includes("Electronics")}
                className="mr-2 border-border"
              />
              Electronics
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleCategoryFilter("Beauty")}>
              <Checkbox
                checked={categoryFilter.includes("Beauty")}
                className="mr-2 border-border"
              />
              Beauty
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-border bg-background text-foreground hover:bg-accent"
            >
              Price:{" "}
              {priceRange === "all"
                ? "All"
                : priceRange === "0-100"
                ? "₹0-₹100"
                : priceRange === "100-200"
                ? "₹100-₹200"
                : priceRange === "200-500"
                ? "₹200-₹500"
                : "₹500+"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-border bg-background text-foreground">
            <DropdownMenuItem onClick={() => setPriceRange("all")}>
              All Prices
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceRange("0-100")}>
              ₹0-₹100
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceRange("100-200")}>
              ₹100-₹200
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceRange("200-500")}>
              ₹200-₹500
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceRange("500+")}>
              ₹500+
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-border bg-background text-foreground hover:bg-accent"
              >
                <Columns3 className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-border bg-background text-foreground w-48"
            >
              <DropdownMenuItem onClick={() => toggleColumn("productName")}>
                <Checkbox
                  checked={visibleColumns.productName}
                  className="mr-2 border-border"
                />
                Product Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumn("price")}>
                <Checkbox
                  checked={visibleColumns.price}
                  className="mr-2 border-border"
                />
                Price
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumn("category")}>
                <Checkbox
                  checked={visibleColumns.category}
                  className="mr-2 border-border"
                />
                Category
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumn("stock")}>
                <Checkbox
                  checked={visibleColumns.stock}
                  className="mr-2 border-border"
                />
                Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumn("sku")}>
                <Checkbox
                  checked={visibleColumns.sku}
                  className="mr-2 border-border"
                />
                SKU
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumn("rating")}>
                <Checkbox
                  checked={visibleColumns.rating}
                  className="mr-2 border-border"
                />
                Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumn("status")}>
                <Checkbox
                  checked={visibleColumns.status}
                  className="mr-2 border-border"
                />
                Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left">
                  <Checkbox
                    checked={
                      paginatedProducts.length > 0 &&
                      selectedProducts.length === paginatedProducts.length
                    }
                    onCheckedChange={toggleAll}
                    className="border-border"
                  />
                </th>
                {visibleColumns.productName && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Product Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                )}
                {visibleColumns.price && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Price
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                )}
                {visibleColumns.category && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Category
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                )}
                {visibleColumns.stock && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Stock
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                )}
                {visibleColumns.sku && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    SKU
                  </th>
                )}
                {visibleColumns.rating && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Rating
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                )}
                {visibleColumns.status && (
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Status
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                )}
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-accent/50"
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProduct(product.id)}
                      className="border-border"
                    />
                  </td>
                  {visibleColumns.productName && (
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-12 w-12 rounded-md bg-muted object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.price && (
                    <td className="p-4">₹{product.price}</td>
                  )}
                  {visibleColumns.category && (
                    <td className="p-4 text-muted-foreground">
                      {product.category}
                    </td>
                  )}
                  {visibleColumns.stock && (
                    <td className="p-4 text-muted-foreground">
                      {product.stock}
                    </td>
                  )}
                  {visibleColumns.sku && (
                    <td className="p-4 text-muted-foreground">{product.sku}</td>
                  )}
                  {visibleColumns.rating && (
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                        <span>{product.rating}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.status && (
                    <td className="p-4">
                      {product.status === "Active" && (
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                          Active
                        </Badge>
                      )}
                      {product.status === "Out Of Stock" && (
                        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                          Out Of Stock
                        </Badge>
                      )}
                      {product.status === "Closed For Sale" && (
                        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                          Closed For Sale
                        </Badge>
                      )}
                    </td>
                  )}
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-border bg-background text-foreground"
                      >
                        <DropdownMenuItem
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicateProduct(product)}
                        >
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border p-4">
          <p className="text-sm text-muted-foreground">
            {selectedProducts.length} of {filteredProducts.length} row(s)
            selected.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-border bg-background text-foreground hover:bg-accent disabled:opacity-50"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="border-border bg-background text-foreground hover:bg-accent disabled:opacity-50"
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add Product Sheet
      <AddProductSheet
        open={isAddProductOpen}
        onOpenChange={(open) => {
          setIsAddProductOpen(open);
          if (!open) setEditingProduct(null);
        }}
        onAddProduct={handleAddProduct}
        editingProduct={editingProduct}
      /> */}
    </div>
  );
}
