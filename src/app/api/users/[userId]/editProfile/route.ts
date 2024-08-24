import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user: logged } = await validateRequest();
    if (!logged) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { displayName, avatarUrl, bio } = await req.json();

    if (!displayName || !avatarUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: logged.id,
      },
      data: {
        displayName,
        avatarUrl,
        bio,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
