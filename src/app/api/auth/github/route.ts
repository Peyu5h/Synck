import { NextResponse } from "next/server";
import { GitHub } from "arctic";
import crypto from "crypto";

const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
);

// Helper function to generate a random code verifier
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("hex");
}

// Helper function to generate a random state
function generateState() {
  return crypto.randomBytes(16).toString("hex");
}

export async function GET() {
  const codeVerifier = generateCodeVerifier();
  const state = generateState();

  // Store the codeVerifier and state in cookies
  const redirectURL = await github.createAuthorizationURL(state, codeVerifier);
  const response = NextResponse.redirect(redirectURL.toString());
  response.cookies.set("github_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
  });
  response.cookies.set("github_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
  });
  return response;
}
