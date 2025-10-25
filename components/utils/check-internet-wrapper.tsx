"use client";

import { useOnlineStatus } from "../hooks/use-onlineStatus";
import NoInternetCard from "./no-internet-card";

export const CheckInternetWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isOnline = useOnlineStatus();
  if (!isOnline) {
    return <NoInternetCard />;
  }
  return <>{children}</>;
};
