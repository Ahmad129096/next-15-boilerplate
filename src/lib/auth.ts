import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// @ts-ignore
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";

// @ts-ignore
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Mock user data - replace with your actual authentication logic
        const mockUsers = [
          {
            id: "1",
            email: "user@example.com",
            password: "password123",
            name: "John Doe",
          },
        ];

        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          return null;
        }

        // Return user without password
        const { ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          id: string;
          name: string | null;
          email: string | null;
        };
        (token as JWT & { id: string }).id = u.id;
        token.name = u.name ?? undefined;
        token.email = u.email ?? undefined;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      const t = token as JWT & { id?: string };
      if (t) {
        (
          session.user as {
            id?: string;
            name?: string | null;
            email?: string | null;
          }
        ).id = t.id ?? "";
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-secret-change-me",
  trustHost: true,
} satisfies NextAuthConfig);
