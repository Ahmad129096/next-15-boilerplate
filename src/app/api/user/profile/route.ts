import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

//@ts-ignore
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Example of accessing session data
    const userData = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      message: "This data is accessed using useSession in the API route",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Example of processing data with session context
    const response = {
      message: "Data processed successfully",
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
      receivedData: body,
      processedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
