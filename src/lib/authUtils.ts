// Cookie utilities
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
};

const getCookie = (name: string): string | null => {
  if (typeof window !== "undefined") {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

const removeCookie = (name: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

export const setAuthToken = (token: string) => {
  setCookie("auth_token", token, 7); // 7 days
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token); // Keep for backward compatibility
  }
};

export const getAuthToken = (): string | null => {
  // Try cookie first, then localStorage
  const cookieToken = getCookie("auth_token");
  if (cookieToken) return cookieToken;

  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

export const removeAuthToken = () => {
  removeCookie("auth_token");
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

// Initialize auth using NextAuth session (client-side)
export const initializeAuth = async (): Promise<AuthUser | null> => {
  try {
    // Lazy import to avoid SSR issues
    const { getSession } = await import("next-auth/react");
    const session = await getSession();
    if (session?.user) {
      const user: AuthUser = {
        id: (session.user as { id?: string }).id ?? "",
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      };
      return user;
    }
    return null;
  } catch (error) {
    console.error("Failed to initialize auth:", error);
    removeAuthToken();
    return null;
  }
};
