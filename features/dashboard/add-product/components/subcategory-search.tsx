"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { set } from "zod";

export const title = "Async/Dynamic Search";

const CategoriesDB = [
  {
    name: "man",
    subcategories: [
      { name: "T-Shirts", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Shirts", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Jeans", sizes: ["28", "30", "32", "34", "36", "38", "40"] },
      { name: "Trousers", sizes: ["28", "30", "32", "34", "36", "38", "40"] },
      { name: "Shorts", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Sweatshirts", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Jackets", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Suits & Blazers", sizes: ["38", "40", "42", "44", "46"] },
      { name: "Ethnic Wear", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Activewear", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Innerwear & Sleepwear", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Footwear", sizes: ["6", "7", "8", "9", "10", "11", "12"] },
      { name: "Watches", sizes: [] },
      { name: "Accessories", sizes: [] },
      { name: "Grooming", sizes: [] },
    ],
  },
  {
    name: "woman",
    subcategories: [
      { name: "Tops & T-Shirts", sizes: ["XS", "S", "M", "L", "XL"] },
      { name: "Dresses", sizes: ["XS", "S", "M", "L", "XL"] },
      { name: "Jeans", sizes: ["26", "28", "30", "32", "34", "36"] },
      { name: "Trousers & Leggings", sizes: ["S", "M", "L", "XL", "XXL"] },
      { name: "Skirts & Shorts", sizes: ["XS", "S", "M", "L", "XL"] },
      { name: "Kurtas & Suits", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
      { name: "Sarees", sizes: ["Free Size"] },
      { name: "Ethnic Wear", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
      { name: "Sweatshirts & Jackets", sizes: ["S", "M", "L", "XL"] },
      { name: "Activewear", sizes: ["S", "M", "L", "XL"] },
      { name: "Innerwear & Sleepwear", sizes: ["S", "M", "L", "XL"] },
      { name: "Footwear", sizes: ["4", "5", "6", "7", "8", "9"] },
      { name: "Handbags", sizes: [] },
      { name: "Jewellery", sizes: [] },
      { name: "Accessories", sizes: [] },
      { name: "Beauty & Personal Care", sizes: [] },
    ],
  },
  {
    name: "kids",
    subcategories: [
      {
        name: "T-Shirts & Shirts",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      {
        name: "Dresses & Frocks",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      {
        name: "Jeans & Trousers",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      {
        name: "Shorts & Skirts",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      {
        name: "Sweatshirts & Jackets",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      {
        name: "Ethnic Wear",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      {
        name: "School Uniforms",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
          "10-12Y",
        ],
      },
      {
        name: "Nightwear",
        sizes: [
          "2-3Y",
          "3-4Y",
          "4-5Y",
          "5-6Y",
          "6-7Y",
          "7-8Y",
          "8-9Y",
          "9-10Y",
        ],
      },
      { name: "Footwear", sizes: ["1", "2", "3", "4", "5", "6", "7"] },
      { name: "Toys & Games", sizes: [] },
      { name: "Accessories", sizes: [] },
    ],
  },
];

export const SubcategorySearch = ({
  category,
  setSubCategory,
}: {
  category: string;
  setSubCategory: (values: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [subCategories, setSubCategories] = useState<
    {
      name: string;
      sizes: string[];
    }[]
  >([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults([]);
    setSubCategories([]);
    setValue("");
    setSearch("");
  }, [category]);

  useEffect(() => {
    const subCategory = CategoriesDB.filter(
      (c) => c.name === category.toLowerCase()
    )[0]?.subcategories;
    setSubCategories(subCategory);

    if (!search) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      // Simulate API call
      setResults(
        subCategories
          .filter((sub) =>
            sub.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((sb) => sb.name)
      );
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[250px] justify-between"
          role="combobox"
          variant="outline"
        >
          {value || "Search..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={setSearch}
            placeholder="Type to search..."
            value={search}
          />
          <CommandList>
            {isSearching ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="size-4 animate-spin" />
                <span className="ml-2 text-muted-foreground text-sm">
                  Searching...
                </span>
              </div>
            ) : (
              <>
                {!search && (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    Start typing to search
                  </div>
                )}
                {search && results.length === 0 && !isSearching && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                {results.length > 0 && (
                  <CommandGroup>
                    {results.map((result) => (
                      <CommandItem
                        key={result}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setSubCategory([
                            ...subCategories.filter((sb) =>
                              sb.name
                                .toLowerCase()
                                .includes(currentValue.toLowerCase())
                            ),
                          ]);
                          setOpen(false);
                        }}
                        value={result}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            value === result ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {result}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
