import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export async function useLogout() {
  const Route = useRouter();

  async function logout() {
    await signOut({
      fetchOptions: {
        onError: (error) => {
          console.log("Error logging out:", error);
          toast.error(error.error.message || "Error logging out");
        },
        onSuccess: () => {
          toast.success("Logged out successfully");
          Route.push("/auth/login");
        },
      },
    });
  }
  return { logout };
}
