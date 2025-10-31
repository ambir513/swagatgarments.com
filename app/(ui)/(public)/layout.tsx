import React from "react";
import { Footer } from "@/features/landing/components/footer";
import { Header } from "@/features/landing/components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
