// import { NextResponse } from "next/server";
// import { Google } from "arctic";
// import crypto from "crypto";

// const google = new Google(
//   process.env.GOOGLE_CLIENT_ID!,
//   process.env.GOOGLE_CLIENT_SECRET!,
//   process.env.GOOGLE_REDIRECT_URI!,
// );

// // Helper function to generate a random code verifier
// function generateCodeVerifier() {
//   return crypto.randomBytes(32).toString("hex");
// }

// // Helper function to generate a random state
// function generateState() {
//   return crypto.randomBytes(16).toString("hex");
// }

// export async function GET() {
//   const codeVerifier = generateCodeVerifier();
//   const state = generateState();

//   // Store the codeVerifier and state in cookies
//   const response = NextResponse.redirect(
//     await google.createAuthorizationURL(state, codeVerifier),
//   );
//   response.cookies.set("google_code_verifier", codeVerifier, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 10, // 10 minutes
//   });
//   response.cookies.set("google_state", state, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 60 * 10, // 10 minutes
//   });
//   return response;
// }
