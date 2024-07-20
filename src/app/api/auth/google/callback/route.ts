// import { NextResponse } from "next/server";
// import { Google } from "arctic";
// import { generateIdFromEntropySize } from "lucia";
// import { lucia } from "@/auth";
// import prisma from "@/lib/prisma";

// const google = new Google(
//   process.env.GOOGLE_CLIENT_ID!,
//   process.env.GOOGLE_CLIENT_SECRET!,
//   process.env.GOOGLE_REDIRECT_URI!,
// );

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const code = url.searchParams.get("code");
//   const cookies = request.headers.get("Cookie") ?? "";
//   const codeVerifierCookie = cookies.match(/google_code_verifier=([^;]+)/)?.[1];
//   const stateCookie = cookies.match(/google_state=([^;]+)/)?.[1];
//   const state = url.searchParams.get("state");

//   if (
//     !code ||
//     !codeVerifierCookie ||
//     !state ||
//     !stateCookie ||
//     state !== stateCookie
//   ) {
//     return NextResponse.redirect("/error");
//   }

//   try {
//     const tokens = await google.validateAuthorizationCode(
//       code,
//       codeVerifierCookie,
//     );
//     const googleUserResponse = await fetch(
//       "https://www.googleapis.com/oauth2/v2/userinfo",
//       {
//         headers: {
//           Authorization: `Bearer ${tokens.accessToken}`,
//         },
//       },
//     );
//     const googleUserResult = await googleUserResponse.json();

//     const existingUser = await prisma.user.findUnique({
//       where: { googleId: googleUserResult.id },
//     });

//     let userId: string;
//     if (existingUser) {
//       userId = existingUser.id;
//     } else {
//       userId = generateIdFromEntropySize(10);
//       await prisma.user.create({
//         data: {
//           id: userId,
//           username: googleUserResult.name,
//           displayName: googleUserResult.name,
//           googleId: googleUserResult.id,
//         },
//       });
//     }

//     const session = await lucia.createSession(userId, {});
//     const sessionCookie = lucia.createSessionCookie(session.id);

//     const response = NextResponse.redirect("/");
//     response.cookies.set(
//       sessionCookie.name,
//       sessionCookie.value,
//       sessionCookie.attributes,
//     );
//     return response;
//   } catch (e) {
//     console.error(e);
//     return NextResponse.redirect("/error");
//   }
// }
