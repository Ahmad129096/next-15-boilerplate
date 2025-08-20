# Next.js Boilerplate

A complete Next.js application with NextAuth.js authentication, Redux state management, and route protection. Built with TypeScript and Tailwind CSS.

## Features

- ✅ **NextAuth.js Authentication** - Complete authentication system with session management
- ✅ **Redux State Management** - Redux Toolkit with persistence for managing application state
- ✅ **Route Protection** - Middleware-based route protection with automatic redirects
- ✅ **API Route Protection** - Server-side session validation in API routes
- ✅ **TypeScript** - Full TypeScript support with proper type definitions
- ✅ **Tailwind CSS** - Modern styling with Tailwind CSS
- ✅ **Responsive Design** - Mobile-first responsive design
- ✅ **Modern Next.js** - Built with the latest Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth API routes
│   │   └── user/          # Example protected API routes
│   ├── login/             # Login page (public route)
│   ├── profile/           # Profile page (protected route)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (private route)
├── components/            # React components
│   ├── providers/         # Context providers
│   ├── ApiDemo.tsx        # API route demonstration
│   └── AuthInitializer.tsx # Authentication initialization
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── authUtils.ts      # Authentication utilities
│   ├── hooks.ts          # Redux hooks
│   ├── slices/           # Redux slices
│   └── store.ts          # Redux store configuration
├── types/                 # TypeScript type definitions
└── middleware.ts         # Next.js middleware for route protection
```

## Authentication

### Demo Credentials

Use these credentials to test the authentication:

- **Email:** user@example.com
- **Password:** password123

### Authentication Flow

1. **Private Routes** (`/`): Only accessible when NOT authenticated
2. **Public Routes** (`/login`): Accessible to all users
3. **Protected Routes** (`/profile`): Require authentication
4. **Automatic Redirects**:
   - Authenticated users trying to access `/` → redirected to `/profile`
   - Authenticated users trying to access `/login` → redirected to `/profile`
   - Unauthenticated users trying to access `/profile` → redirected to `/login`

### NextAuth.js Features

- **Session Management** - Automatic session handling with JWT strategy
- **API Route Protection** - Server-side session validation
- **TypeScript Support** - Full type safety for session data
- **Custom Callbacks** - JWT and session callbacks for data transformation

## API Routes

### Example Protected API Route

The application includes an example API route at `/api/user/profile` that demonstrates:

- **Server-side session validation** using NextAuth's `auth()` function
- **Accessing user data** from the session
- **Processing requests** with authentication context

#### Usage Example:

```typescript
// GET /api/user/profile
const response = await fetch('/api/user/profile');
const userData = await response.json();

// POST /api/user/profile
const response = await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
});
```

## Redux Store

The application uses Redux Toolkit with the following features:

- **Redux Toolkit** for simplified Redux setup
- **Redux Persist** for state persistence
- **TypeScript** support with proper type definitions
- **Custom hooks** for easy state access

## Route Protection

Route protection is implemented using Next.js middleware:

- **Middleware** (`middleware.ts`) handles route protection
- **NextAuth integration** for server-side authentication checks
- **Automatic redirects** based on authentication status
- **Private routes** for unauthenticated users only

## Customization

### Adding New Routes

1. Create page in `src/app/`
2. Update `middleware.ts` if needed
3. Add route to appropriate arrays (public/protected/private)

### Extending Authentication

1. Update NextAuth configuration in `src/lib/auth.ts`
2. Add new providers or modify existing ones
3. Update TypeScript types in `src/types/next-auth.d.ts`

### Adding Protected API Routes

1. Create new API route in `src/app/api/`
2. Use `auth()` function to validate sessions
3. Access user data from the session object

### Adding Redux Slices

1. Create new slice in `src/lib/slices/`
2. Add the reducer to the store in `src/lib/store.ts`
3. Update the persist configuration if needed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework
- **NextAuth.js** - Authentication library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Redux** - Redux bindings for React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
