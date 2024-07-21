import { Prisma } from "@prisma/client";

export const postDataInclude = {
  user: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
} as const;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
