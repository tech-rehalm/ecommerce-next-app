// lib/getSession.ts
import { auth } from "@/auth"; // Adjust the import path if necessary

export async function getSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
}
