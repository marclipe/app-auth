import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Logout endpoint called");
  try {
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", { maxAge: -1 }); //remove the cookie
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
