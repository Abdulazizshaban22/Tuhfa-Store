import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
const config = {
  providers: [GitHub],
  session: { strategy: "database" },
} satisfies NextAuthConfig
export default config
