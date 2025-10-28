import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import conn from "@/db"; // your drizzle instance
import { account, session, user, verification } from "@/db/schema";

const db = await conn;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql", // or "pg", "sqlite"
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    },
    usePlural: false,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 4,
  },
});
