import { NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

// Guard routes
export async function middleware(req: NextApiRequest) {
  const session = await getSession({ ctx: { req } });
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// List of protected routes
export const config = {
  matcher: ["/", "/employees", "/projects", "/settings"],
};
