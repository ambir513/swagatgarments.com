import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import type { auth } from "./auth";
import { ac, roles } from "./permission";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>(), adminClient({ ac, roles })],
});

export const { signOut, useSession } = authClient;
