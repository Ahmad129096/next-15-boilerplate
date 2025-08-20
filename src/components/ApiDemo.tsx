"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface UserProfileResponse {
  id: string;
  name: string | null;
  email: string | null;
  message?: string;
  timestamp?: string;
}

interface ApiPostResponse {
  message: string;
  user: { id: string; name: string | null; email: string | null };
  receivedData: Record<string, unknown>;
  processedAt: string;
}

export default function ApiDemo() {
  const { data: session } = useSession();
  const [apiData, setApiData] = useState<
    UserProfileResponse | ApiPostResponse | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/profile");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = (await response.json()) as UserProfileResponse;
      setApiData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const sendTestData = async () => {
    setLoading(true);
    setError("");

    try {
      const testData = {
        message: "Hello from client!",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = (await response.json()) as ApiPostResponse;
      setApiData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800">
          Please sign in to test the API routes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">API Route Demo</h3>
      <p className="text-sm text-gray-600 mb-4">
        This demonstrates how to access session data in API routes using
        NextAuth.js.
      </p>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={fetchUserData}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "GET User Data"}
          </button>

          <button
            onClick={sendTestData}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "POST Test Data"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {apiData && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h4 className="font-medium text-gray-900 mb-2">API Response:</h4>
            <pre className="text-sm text-gray-700 overflow-auto">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
