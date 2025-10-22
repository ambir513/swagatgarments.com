import { ResetPassForm } from "@/features/auth/components/reset-pass-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

const page = async ({ searchParams }: PageProps) => {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");
  return <ResetPassForm token={token} />;
};

export default page;
