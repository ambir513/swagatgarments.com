"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/logout";
import { signOut, useSession } from "@/lib/auth-client";
import { Toaster } from "react-hot-toast";

const page = () => {
  const { data } = useSession();
  const logout = useLogout();
  console.log(data?.user);
  const handleLogout = async () => {
    (await logout).logout();
  };
  return (
    <div className="">
      <div className="">Dashboard</div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default page;
