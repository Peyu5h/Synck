import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostData, PostsPage } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor");

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: user.id,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: getPostData(user.id),
    });

    const hasMore = posts.length > pageSize;
    const nextCursor = hasMore ? posts[pageSize].id : null; // contains id of last fetched post

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      hasMore: nextCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
