import { UserRole } from "@prisma/client";
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  [UserRole.USER]: ac.newRole({
    posts: ["read", "create", "update:own", "delete:own"],
  }),   
  [UserRole.ADMIN]: ac.newRole({
    ...adminAc.statements,
    posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
  }),
};
