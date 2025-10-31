import ProductDetails from "@/features/product-details/components/product-details";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id);
  return <ProductDetails id={id} />;
};

export default page;
