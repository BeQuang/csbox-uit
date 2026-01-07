export const ROLES = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  USER: "USER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
