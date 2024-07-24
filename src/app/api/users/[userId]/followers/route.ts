import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FollowerInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: logged } = await validateRequest();
    if (!logged) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: { followerId: logged.id },
          select: { followerId: true },
        },
        _count: {
          select: { followers: true },
        },
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length, //if 0, then false, else true
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: logged } = await validateRequest();
    if (!logged) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: logged.id,
          followingId: userId,
        },
      },
      create: {
        followerId: logged.id,
        followingId: userId,
      },
      update: {},
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: logged } = await validateRequest();
    if (!logged) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: logged.id,
        followingId: userId,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
