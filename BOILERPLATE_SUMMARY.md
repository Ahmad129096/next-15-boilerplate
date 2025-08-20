# Next.js Boilerplate - Complete Summary

## 🎯 What's Included

This boilerplate provides a complete Next.js application with the following features:

### ✅ Authentication System (NextAuth.js)

- Login/Logout using NextAuth.js (Credentials provider) with JWT sessions
- Route protection via middleware using server-side session checks
- Automatic redirects based on authentication status (login/profile/home)
- Type-safe session data and callbacks

### ✅ Redux State Management

- Redux Toolkit available for app state needs (non-auth)
- Redux Persist configured (you can add more slices as needed)
- Type-safe hooks for convenient access

### ✅ Route Structure

- Home page (`/`) - Private route, only accessible when NOT authenticated
- Login page (`/login`) - Public route
- Profile page (`/profile`) - Protected route, requires authentication

### ✅ Modern Tech Stack

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React 19

## 🚀 Quick Start

1. Install dependencies:

```bash
npm install
```

2. Environment variables (development):

```env
# .env.local
AUTH_SECRET=dev-secret-change-me
NEXTAUTH_URL=http://localhost:3000
```

3. Run development server:

```bash
npm run dev
```

4. Demo credentials:

- Email: `user@example.com`
- Password: `password123`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth API
│   │   └── user/profile/route.ts         # Example protected API
│   ├── login/page.tsx                    # Login (public)
│   ├── profile/page.tsx                  # Profile (protected)
│   ├── layout.tsx                        # Root layout (Session + Redux providers)
│   └── page.tsx                          # Home (private when authenticated)
├── components/
│   ├── ApiDemo.tsx                       # Calls protected API (GET/POST)
│   └── providers/
│       ├── ReduxProvider.tsx
│       └── SessionProvider.tsx
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── authUtils.ts                      # Cookie helpers & session hydration util
│   ├── hooks.ts                          # Redux hooks
│   ├── slices/                           # Redux slices (extensible)
│   └── store.ts                          # Redux store + persist
├── middleware.ts                          # Route protection (home/login/profile)
└── types/next-auth.d.ts                   # NextAuth type augmentation
```

## 🔐 Authentication Flow

### Private Routes (`/`)

- Only accessible when NOT authenticated
- If authenticated → redirect to `/profile`

### Public Routes (`/login`)

- Accessible to all users
- If authenticated → redirect to `/profile`

### Protected Routes (`/profile`)

- Require authentication
- If unauthenticated → redirect to `/login`

## 🛠️ Key Features Explained

### 1. NextAuth.js Configuration (Credentials + JWT)

```ts
// src/lib/auth.ts (excerpt)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
            u.email === credentials?.email &&
            u.password === credentials?.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
```

### 2. Middleware Route Protection

```ts
// src/middleware.ts (excerpt)
const session = await auth();
if (session && pathname === "/")
  return NextResponse.redirect(new URL("/profile", request.url));
if (session && pathname === "/login")
  return NextResponse.redirect(new URL("/profile", request.url));
if (!session && ["/profile"].includes(pathname))
  return NextResponse.redirect(new URL("/login", request.url));
```

### 3. Protected API Route Example

```ts
// src/app/api/user/profile/route.ts (excerpt)
import { auth } from "@/lib/auth";
export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });
}
```

### 4. Client Session Usage

```ts
// Using useSession in components
import { useSession } from "next-auth/react";
const { data: session, status } = useSession();
```

## 🎨 UI & DX

- Responsive Tailwind UI
- Loading states on auth-sensitive pages
- API demo component illustrating GET/POST to a protected API

## 🔧 Customization Guide

### Extending Authentication

1. Add/update providers in `src/lib/auth.ts`
2. Adjust JWT/session callbacks to include extra claims
3. Update `types/next-auth.d.ts` if you extend session/user

### Adding Protected API Routes

1. Create a new handler under `src/app/api/...`
2. Call `const session = await auth()` and enforce authorization

### Adding Redux Slices

1. Create a slice in `src/lib/slices/`
2. Register reducer in `src/lib/store.ts`
3. Persist selectively via `persistConfig`

## 🚀 Deployment Ready

- Production build and start scripts
- `.env` driven configuration for secrets and URLs
- Middleware-based redirects

## 📝 Next Steps

- Replace mock credentials with your backend or provider(s)
- Add more protected/role-based routes
- Extend API endpoints and data models
- Add tests (Jest/RTL) as needed

## 🎉 Ready to Use!

This boilerplate provides a solid foundation for building modern Next.js applications with NextAuth authentication, protected API routes, and optional Redux state management. Start building on top of it!
