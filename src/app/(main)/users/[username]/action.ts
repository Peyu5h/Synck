"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  userId: string,
  data: {
    displayName: string;
    avatarUrl: string;
    bio: string;
  },
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
      },
    });

    revalidatePath(`/users/${userId}`);
    revalidatePath(`/users/[username]`);
    revalidatePath(`/`);
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile");
  }
}
