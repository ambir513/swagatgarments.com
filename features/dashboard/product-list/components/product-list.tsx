"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  CirclePlus,
  Tag,
  ChevronDown,
  Columns3,
  MoreHorizontal,
  ArrowUpDown,
  X,
} from "lucide-react";
import { useProducts } from "../hooks/use-product";
import Link from "next/link";

export function ProductList() {
  const { products, loading, error } = useProducts();

  const [open, setOpen] = useState<{ event: boolean; data: any }>({
    event: false,
    data: {},
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    productName: true,
    price: true,
    category: true,
    stock: true,
    code: true,
    variants: true,
    status: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(product.status);
      const matchesCategory =
        categoryFilter.length === 0 ||
        categoryFilter.includes(product.categories);

      let matchesPrice = true;
      if (priceRange !== "all" && product.variants.length > 0) {
        const minPrice = Math.min(
          ...product.variants.map((v) => v.price).filter((p) => !isNaN(p))
        );

        if (priceRange === "0-500") {
          matchesPrice = minPrice >= 0 && minPrice <= 500;
        } else if (priceRange === "500-1000") {
          matchesPrice = minPrice > 500 && minPrice <= 1000;
        } else if (priceRange === "1000-2000") {
          matchesPrice = minPrice > 1000 && minPrice <= 2000;
        } else if (priceRange === "2000+") {
          matchesPrice = minPrice > 2000;
        }
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, statusFilter, categoryFilter, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter, priceRange]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "INACTIVE":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      case "OUTOFSTOCK":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      case "CLOSEDOFSALE":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const activeFiltersCount =
    statusFilter.length +
    categoryFilter.length +
    (priceRange !== "all" ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 text-foreground flex items-center justify-center">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 text-foreground flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    // <Sheet>
    //   <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 text-foreground">
    //     {/* Header */}
    //     <div className="mb-6 flex flex-col gap-4">
    //       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
    //         <p></p>
    //         <Link href={"/dashboard/add-product"}>
    //           <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
    //             Add Product
    //           </Button>
    //         </Link>
    //       </div>

    //       {/* Search Bar */}
    //       <div className="relative w-full">
    //         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    //         <Input
    //           placeholder="Search products..."
    //           className="border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground w-full"
    //           value={searchQuery}
    //           onChange={(e) => setSearchQuery(e.target.value)}
    //         />
    //       </div>

    //       <div className="flex flex-col gap-3">
    //         <Button
    //           variant="outline"
    //           className="md:hidden w-full border-border bg-background text-foreground hover:bg-accent justify-between"
    //           onClick={() => setShowFilters(!showFilters)}
    //         >
    //           <span className="flex items-center gap-2">
    //             <Tag className="h-4 w-4" />
    //             Filters
    //             {activeFiltersCount > 0 && (
    //               <Badge className="bg-primary text-white">
    //                 {activeFiltersCount}
    //               </Badge>
    //             )}
    //           </span>
    //           <ChevronDown
    //             className={`h-4 w-4 transition-transform ${
    //               showFilters ? "rotate-180" : ""
    //             }`}
    //           />
    //         </Button>

    //         {/* Desktop filters - always visible */}
    //         <div className="hidden md:flex flex-wrap items-center gap-2">
    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button
    //                 variant="outline"
    //                 className="border-border bg-background text-foreground hover:bg-accent"
    //               >
    //                 <CirclePlus className="mr-2 h-4 w-4" />
    //                 Status
    //                 {statusFilter.length > 0 && (
    //                   <Badge className="ml-2 h-5 w-5 rounded-full bg-primary p-0 text-xs text-white">
    //                     {statusFilter.length}
    //                   </Badge>
    //                 )}
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent className="border-border bg-background text-foreground">
    //               <DropdownMenuItem
    //                 onClick={() => toggleStatusFilter("ACTIVE")}
    //               >
    //                 <Checkbox
    //                   checked={statusFilter.includes("ACTIVE")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Active
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => toggleStatusFilter("INACTIVE")}
    //               >
    //                 <Checkbox
    //                   checked={statusFilter.includes("INACTIVE")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Inactive
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => toggleStatusFilter("OUTOFSTOCK")}
    //               >
    //                 <Checkbox
    //                   checked={statusFilter.includes("OUTOFSTOCK")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Out Of Stock
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => toggleStatusFilter("CLOSEDOFSALE")}
    //               >
    //                 <Checkbox
    //                   checked={statusFilter.includes("CLOSEDOFSALE")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Closed For Sale
    //               </DropdownMenuItem>
    //             </DropdownMenuContent>
    //           </DropdownMenu>

    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button
    //                 variant="outline"
    //                 className="border-border bg-background text-foreground hover:bg-accent"
    //               >
    //                 <Tag className="mr-2 h-4 w-4" />
    //                 Category
    //                 {categoryFilter.length > 0 && (
    //                   <Badge className="ml-2 h-5 w-5 rounded-full bg-primary p-0 text-xs text-white">
    //                     {categoryFilter.length}
    //                   </Badge>
    //                 )}
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent className="border-border bg-background text-foreground">
    //               <DropdownMenuItem onClick={() => toggleCategoryFilter("MAN")}>
    //                 <Checkbox
    //                   checked={categoryFilter.includes("MAN")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Men
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => toggleCategoryFilter("WOMAN")}
    //               >
    //                 <Checkbox
    //                   checked={categoryFilter.includes("WOMAN")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Women
    //               </DropdownMenuItem>
    //               <DropdownMenuItem
    //                 onClick={() => toggleCategoryFilter("KIDS")}
    //               >
    //                 <Checkbox
    //                   checked={categoryFilter.includes("KIDS")}
    //                   className="mr-2 border-border"
    //                 />
    //                 Kids
    //               </DropdownMenuItem>
    //             </DropdownMenuContent>
    //           </DropdownMenu>

    //           <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //               <Button
    //                 variant="outline"
    //                 className="border-border bg-background text-foreground hover:bg-accent"
    //               >
    //                 Price:{" "}
    //                 {priceRange === "all"
    //                   ? "All"
    //                   : priceRange === "0-500"
    //                   ? "₹0-₹500"
    //                   : priceRange === "500-1000"
    //                   ? "₹500-₹1000"
    //                   : priceRange === "1000-2000"
    //                   ? "₹1000-₹2000"
    //                   : "₹2000+"}
    //                 <ChevronDown className="ml-2 h-4 w-4" />
    //               </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent className="border-border bg-background text-foreground">
    //               <DropdownMenuItem onClick={() => setPriceRange("all")}>
    //                 All Prices
    //               </DropdownMenuItem>
    //               <DropdownMenuItem onClick={() => setPriceRange("0-500")}>
    //                 ₹0-₹500
    //               </DropdownMenuItem>
    //               <DropdownMenuItem onClick={() => setPriceRange("500-1000")}>
    //                 ₹500-₹1000
    //               </DropdownMenuItem>
    //               <DropdownMenuItem onClick={() => setPriceRange("1000-2000")}>
    //                 ₹1000-₹2000
    //               </DropdownMenuItem>
    //               <DropdownMenuItem onClick={() => setPriceRange("2000+")}>
    //                 ₹2000+
    //               </DropdownMenuItem>
    //             </DropdownMenuContent>
    //           </DropdownMenu>

    //           <div className="ml-auto">
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button
    //                   variant="outline"
    //                   className="border-border bg-background text-foreground hover:bg-accent"
    //                 >
    //                   <Columns3 className="mr-2 h-4 w-4" />
    //                   Columns
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent
    //                 align="end"
    //                 className="border-border bg-background text-foreground w-48"
    //               >
    //                 <DropdownMenuItem
    //                   onClick={() => toggleColumn("productName")}
    //                 >
    //                   <Checkbox
    //                     checked={visibleColumns.productName}
    //                     className="mr-2 border-border"
    //                   />
    //                   Product Name
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem onClick={() => toggleColumn("price")}>
    //                   <Checkbox
    //                     checked={visibleColumns.price}
    //                     className="mr-2 border-border"
    //                   />
    //                   Price
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem onClick={() => toggleColumn("category")}>
    //                   <Checkbox
    //                     checked={visibleColumns.category}
    //                     className="mr-2 border-border"
    //                   />
    //                   Category
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem onClick={() => toggleColumn("stock")}>
    //                   <Checkbox
    //                     checked={visibleColumns.stock}
    //                     className="mr-2 border-border"
    //                   />
    //                   Stock
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem onClick={() => toggleColumn("code")}>
    //                   <Checkbox
    //                     checked={visibleColumns.code}
    //                     className="mr-2 border-border"
    //                   />
    //                   Product Code
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem onClick={() => toggleColumn("variants")}>
    //                   <Checkbox
    //                     checked={visibleColumns.variants}
    //                     className="mr-2 border-border"
    //                   />
    //                   Variants
    //                 </DropdownMenuItem>
    //                 <DropdownMenuItem onClick={() => toggleColumn("status")}>
    //                   <Checkbox
    //                     checked={visibleColumns.status}
    //                     className="mr-2 border-border"
    //                   />
    //                   Status
    //                 </DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </div>
    //         </div>

    //         {/* Mobile filters - collapsible */}
    //         {showFilters && (
    //           <div className="md:hidden flex flex-col gap-2 p-3 bg-accent/30 rounded-lg border border-border">
    //             <div className="flex items-center justify-between mb-2">
    //               <span className="text-sm font-medium">Filter Options</span>
    //               <Button
    //                 variant="ghost"
    //                 size="icon"
    //                 className="h-6 w-6"
    //                 onClick={() => setShowFilters(false)}
    //               >
    //                 <X className="h-4 w-4" />
    //               </Button>
    //             </div>

    //             <div className="space-y-2">
    //               <p className="text-xs font-medium text-muted-foreground">
    //                 Status
    //               </p>
    //               <div className="flex flex-wrap gap-2">
    //                 {["ACTIVE", "INACTIVE", "OUTOFSTOCK", "CLOSEDOFSALE"].map(
    //                   (status) => (
    //                     <Button
    //                       key={status}
    //                       variant={
    //                         statusFilter.includes(status)
    //                           ? "default"
    //                           : "outline"
    //                       }
    //                       size="sm"
    //                       className="text-xs"
    //                       onClick={() => toggleStatusFilter(status)}
    //                     >
    //                       {status === "ACTIVE"
    //                         ? "Active"
    //                         : status === "INACTIVE"
    //                         ? "Inactive"
    //                         : status === "OUTOFSTOCK"
    //                         ? "Out of Stock"
    //                         : "Closed"}
    //                     </Button>
    //                   )
    //                 )}
    //               </div>
    //             </div>

    //             <div className="space-y-2">
    //               <p className="text-xs font-medium text-muted-foreground">
    //                 Category
    //               </p>
    //               <div className="flex flex-wrap gap-2">
    //                 {["MAN", "WOMAN", "KIDS"].map((category) => (
    //                   <Button
    //                     key={category}
    //                     variant={
    //                       categoryFilter.includes(category)
    //                         ? "default"
    //                         : "outline"
    //                     }
    //                     size="sm"
    //                     className="text-xs"
    //                     onClick={() => toggleCategoryFilter(category)}
    //                   >
    //                     {category === "MAN"
    //                       ? "Men"
    //                       : category === "WOMAN"
    //                       ? "Women"
    //                       : "Kids"}
    //                   </Button>
    //                 ))}
    //               </div>
    //             </div>

    //             <div className="space-y-2">
    //               <p className="text-xs font-medium text-muted-foreground">
    //                 Price Range
    //               </p>
    //               <div className="flex flex-wrap gap-2">
    //                 {[
    //                   { value: "all", label: "All" },
    //                   { value: "0-500", label: "₹0-₹500" },
    //                   { value: "500-1000", label: "₹500-₹1000" },
    //                   { value: "1000-2000", label: "₹1000-₹2000" },
    //                   { value: "2000+", label: "₹2000+" },
    //                 ].map((range) => (
    //                   <Button
    //                     key={range.value}
    //                     variant={
    //                       priceRange === range.value ? "default" : "outline"
    //                     }
    //                     size="sm"
    //                     className="text-xs"
    //                     onClick={() => setPriceRange(range.value)}
    //                   >
    //                     {range.label}
    //                   </Button>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Mobile/Tablet Card View */}
    //     <div className="md:hidden space-y-3">
    //       {paginatedProducts.map((product) => (
    //         <div
    //           key={product.id}
    //           className="bg-card border border-border rounded-lg p-4 space-y-3"
    //         >
    //           {/* Product Header */}
    //           <div className="flex gap-3">
    //             <img
    //               src={
    //                 process.env.NEXT_PUBLIC_IMG_URL! + product.images ||
    //                 "/placeholder.svg?height=100&width=100&query=product"
    //               }
    //               alt={product.name}
    //               className="h-20 w-20 rounded-md bg-muted object-cover flex-shrink-0"
    //             />
    //             <div className="flex-1 min-w-0">
    //               <h3 className="font-semibold text-sm line-clamp-2">
    //                 {product.name}
    //               </h3>
    //               <p className="text-xs text-muted-foreground">
    //                 {product.bandName}
    //               </p>
    //               <div className="flex items-center gap-2 mt-2">
    //                 <Badge
    //                   className={`${getStatusColor(product.status)} text-xs`}
    //                 >
    //                   {product.status}
    //                 </Badge>
    //                 {product.variants.length > 0 && (
    //                   <span className="text-sm font-semibold text-foreground">
    //                     ₹{product.variants[0].price || "N/A"}
    //                   </span>
    //                 )}
    //               </div>
    //             </div>
    //             <DropdownMenu>
    //               <DropdownMenuTrigger asChild>
    //                 <Button
    //                   variant="ghost"
    //                   size="icon"
    //                   className="h-8 w-8 text-muted-foreground hover:text-foreground"
    //                 >
    //                   <MoreHorizontal className="h-4 w-4" />
    //                 </Button>
    //               </DropdownMenuTrigger>
    //               <DropdownMenuContent
    //                 align="end"
    //                 className="border-border bg-background text-foreground"
    //               >
    //                 <SheetTrigger asChild>
    //                   <DropdownMenuItem>
    //                     <button>Edit</button>
    //                   </DropdownMenuItem>
    //                 </SheetTrigger>
    //                 <DropdownMenuItem className="text-red-500">
    //                   Delete
    //                 </DropdownMenuItem>
    //               </DropdownMenuContent>
    //             </DropdownMenu>
    //           </div>

    //           {/* Product Details Grid */}
    //           <div className="grid grid-cols-2 gap-3 text-sm">
    //             <div>
    //               <p className="text-xs text-muted-foreground">Code</p>
    //               <p className="font-medium">{product.code}</p>
    //             </div>
    //             <div>
    //               <p className="text-xs text-muted-foreground">Stock</p>
    //               <p className="font-medium">{product.stock || "0"}</p>
    //             </div>
    //             <div>
    //               <p className="text-xs text-muted-foreground">Category</p>
    //               <p className="font-medium">
    //                 {product.categories === "MAN"
    //                   ? "Man"
    //                   : product.categories === "WOMAN"
    //                   ? "Woman"
    //                   : "Kids"}
    //               </p>
    //             </div>
    //             <div>
    //               <p className="text-xs text-muted-foreground">Sub Category</p>
    //               <p className="font-medium text-xs">{product.subCategories}</p>
    //             </div>
    //           </div>

    //           {/* Variants */}
    //           {product.variants.length > 0 && (
    //             <div>
    //               <p className="text-xs text-muted-foreground mb-2">Variants</p>
    //               <div className="flex flex-wrap gap-1">
    //                 {product.variants.slice(0, 3).map((variant, idx) => (
    //                   <Badge key={idx} variant="secondary" className="text-xs">
    //                     {variant.color} - {variant.size}
    //                   </Badge>
    //                 ))}
    //                 {product.variants.length > 3 && (
    //                   <Badge variant="secondary" className="text-xs">
    //                     +{product.variants.length - 3}
    //                   </Badge>
    //                 )}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>

    //     {/* Desktop Table View */}
    //     <div className="hidden md:block rounded-lg border border-border bg-card overflow-hidden">
    //       <div className="overflow-x-auto">
    //         <table className="w-full">
    //           <thead>
    //             <tr className="border-b border-border bg-accent/50">
    //               {visibleColumns.productName && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   <div className="flex items-center gap-2">
    //                     Product Name
    //                   </div>
    //                 </th>
    //               )}
    //               {visibleColumns.price && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   <div className="flex items-center gap-2">Price</div>
    //                 </th>
    //               )}
    //               {visibleColumns.category && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   <div className="flex items-center gap-2">Category</div>
    //                 </th>
    //               )}
    //               {visibleColumns.stock && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   <div className="flex items-center gap-2">Stock</div>
    //                 </th>
    //               )}
    //               {visibleColumns.code && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   Product Code
    //                 </th>
    //               )}
    //               {visibleColumns.variants && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   Variants
    //                 </th>
    //               )}
    //               {visibleColumns.status && (
    //                 <th className="p-4 text-left text-sm font-medium text-muted-foreground">
    //                   <div className="flex items-center gap-2">Status</div>
    //                 </th>
    //               )}
    //               <th className="p-4"></th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {paginatedProducts.map((product) => (
    //               <tr
    //                 key={product.id}
    //                 className="border-b border-border hover:bg-accent/50 transition-colors"
    //               >
    //                 {visibleColumns.productName && (
    //                   <td className="p-4">
    //                     <div className="flex items-center gap-3">
    //                       <img
    //                         src={
    //                           process.env.NEXT_PUBLIC_IMG_URL! +
    //                             product.images ||
    //                           "/placeholder.svg?height=100&width=100&query=product"
    //                         }
    //                         alt={product.name}
    //                         className="h-12 w-12 rounded-md bg-muted object-cover"
    //                       />
    //                       <div>
    //                         <p className="font-medium text-sm">
    //                           {product.name}
    //                         </p>
    //                         <p className="text-xs text-muted-foreground">
    //                           {product.bandName}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   </td>
    //                 )}
    //                 {visibleColumns.price && (
    //                   <td className="p-4 text-sm">
    //                     {product.variants.length > 0
    //                       ? `₹${product.variants[0].price || "N/A"}`
    //                       : "N/A"}
    //                   </td>
    //                 )}
    //                 {visibleColumns.category && (
    //                   <td className="p-4 text-sm text-muted-foreground">
    //                     {product.categories}
    //                   </td>
    //                 )}
    //                 {visibleColumns.stock && (
    //                   <td className="p-4 text-sm text-muted-foreground">
    //                     {product.stock || "0"}
    //                   </td>
    //                 )}
    //                 {visibleColumns.code && (
    //                   <td className="p-4 text-sm text-muted-foreground">
    //                     {product.code}
    //                   </td>
    //                 )}
    //                 {visibleColumns.variants && (
    //                   <td className="p-4">
    //                     <div className="flex flex-wrap gap-1">
    //                       {product.variants.slice(0, 2).map((variant, idx) => (
    //                         <Badge
    //                           key={idx}
    //                           variant="secondary"
    //                           className="text-xs"
    //                         >
    //                           {variant.color} - {variant.size}
    //                         </Badge>
    //                       ))}
    //                       {product.variants.length > 2 && (
    //                         <Badge variant="secondary" className="text-xs">
    //                           +{product.variants.length - 2} more
    //                         </Badge>
    //                       )}
    //                     </div>
    //                   </td>
    //                 )}
    //                 {visibleColumns.status && (
    //                   <td className="p-4">
    //                     <Badge className={getStatusColor(product.status)}>
    //                       {product.status}
    //                     </Badge>
    //                   </td>
    //                 )}
    //                 <td className="p-4">
    //                   {/* <DropdownMenu>
    //                     <DropdownMenuTrigger asChild>
    //                       <Button
    //                         variant="ghost"
    //                         size="icon"
    //                         className="h-8 w-8 text-muted-foreground hover:text-foreground"
    //                       >
    //                         <MoreHorizontal className="h-4 w-4" />
    //                       </Button>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent
    //                       align="end"
    //                       className="border-border bg-background text-foreground"
    //                     >
    //                       <DropdownMenuItem onClick={() => setOpen((prev) =>{ event: true, data: product})}>
    //                         Edit
    //                       </DropdownMenuItem>
    //                       <DropdownMenuItem className="text-red-500">
    //                         Delete
    //                       </DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                   </DropdownMenu> */}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>

    //       {/* Footer */}
    //       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border p-4 bg-accent/30">
    //         <p className="text-sm text-muted-foreground text-center sm:text-left">
    //           Showing {startIndex + 1} to{" "}
    //           {Math.min(endIndex, filteredProducts.length)} of{" "}
    //           {filteredProducts.length} products
    //         </p>
    //         <div className="flex gap-2">
    //           <Button
    //             variant="outline"
    //             className="border-border bg-background text-foreground hover:bg-accent disabled:opacity-50"
    //             onClick={goToPreviousPage}
    //             disabled={currentPage === 1}
    //           >
    //             Previous
    //           </Button>
    //           <Button
    //             variant="outline"
    //             className="border-border bg-background text-foreground hover:bg-accent disabled:opacity-50"
    //             onClick={goToNextPage}
    //             disabled={currentPage === totalPages || totalPages === 0}
    //           >
    //             Next
    //           </Button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Mobile Pagination */}
    //     <div className="md:hidden flex flex-col gap-3 mt-4">
    //       <p className="text-xs text-muted-foreground text-center">
    //         Showing {startIndex + 1} to{" "}
    //         {Math.min(endIndex, filteredProducts.length)} of{" "}
    //         {filteredProducts.length} products
    //       </p>
    //       <div className="flex gap-2 justify-center">
    //         <Button
    //           variant="outline"
    //           size="sm"
    //           className="border-border bg-background text-foreground hover:bg-accent disabled:opacity-50"
    //           onClick={goToPreviousPage}
    //           disabled={currentPage === 1}
    //         >
    //           Previous
    //         </Button>
    //         <Button
    //           variant="outline"
    //           size="sm"
    //           className="border-border bg-background text-foreground hover:bg-accent disabled:opacity-50"
    //           onClick={goToNextPage}
    //           disabled={currentPage === totalPages || totalPages === 0}
    //         >
    //           Next
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </Sheet>
    <h1>hii</h1>
  );
}
