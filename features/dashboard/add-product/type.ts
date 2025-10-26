interface data {
  products: {
    name: string;
    description: string;
    code: string;
    amount: string | null;
    band_name: string;
    stock: string | null;
    status: "ACTIVE" | "INACTIVE" | "OUTOFSTOCK" | "CLOSEDOFSALE";
    categories: "MAN" | "WOMAN" | "KIDS";
    sub_categories: string;
  };
  images: string[];
  variants: [
    {
      color: string;
      price: string | null;
      size: string;
    }
  ];
}
