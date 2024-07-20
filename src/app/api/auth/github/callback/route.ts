// import { NextResponse } from "next/server";
// import { GitHub } from "arctic";
// import { generateIdFromEntropySize } from "lucia";
// import { lucia } from "@/auth";
// import prisma from "@/lib/prisma";

// const github = new GitHub(
//   process.env.GITHUB_CLIENT_ID!,
//   process.env.GITHUB_CLIENT_SECRET!,
// );

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const code = url.searchParams.get("code");
//   const cookies = request.headers.get("Cookie") ?? "";
//   const codeVerifierCookie = cookies.match(/github_code_verifier=([^;]+)/)?.[1];
//   const stateCookie = cookies.match(/github_state=([^;]+)/)?.[1];
//   const state = url.searchParams.get("state");

//   if (
//     !code ||
//     !codeVerifierCookie ||
//     !state ||
//     !stateCookie ||
//     state !== stateCookie
//   ) {
//     return NextResponse.redirect(
//       new URL("/error", process.env.NEXT_PUBLIC_BASE_URL).toString(),
//     );
//   }

//   try {
//     const tokens = await github.validateAuthorizationCode(code);
//     const githubUserResponse = await fetch("https://api.github.com/user", {
//       headers: {
//         Authorization: `Bearer ${tokens.accessToken}`,
//       },
//     });
//     const githubUserResult = await githubUserResponse.json();

//     const existingUser = await prisma.user.findUnique({
//       where: { githubId: githubUserResult.id },
//     });

//     let userId: string;
//     if (existingUser) {
//       userId = existingUser.id;
//     } else {
//       userId = generateIdFromEntropySize(10);
//       await prisma.user.create({
//         data: {
//           id: userId,
//           username: githubUserResult.login,
//           displayName: githubUserResult.name,
//           githubId: githubUserResult.id,
//         },
//       });
//     }

//     const session = await lucia.createSession(userId, {});
//     const sessionCookie = lucia.createSessionCookie(session.id);

//     const response = NextResponse.redirect(
//       new URL("/", process.env.NEXT_PUBLIC_BASE_URL).toString(),
//     );
//     response.cookies.set(
//       sessionCookie.name,
//       sessionCookie.value,
//       sessionCookie.attributes,
//     );
//     return response;
//   } catch (e) {
//     console.error(e);
//     return NextResponse.redirect(
//       new URL("/error", process.env.NEXT_PUBLIC_BASE_URL).toString(),
//     );
//   }
// }
