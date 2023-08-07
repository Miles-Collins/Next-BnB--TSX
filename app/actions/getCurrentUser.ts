import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// Asynchronous function to get the session using 'getServerSession' with 'authOptions'
export async function getSession() {
  // Returning the result of 'getServerSession' with 'authOptions'
  return await getServerSession(authOptions);
}

// Asynchronous function to get the current user's data
export default async function getCurrentUser() {
  try {
    // Getting the session using the previously defined 'getSession' function
    const session = await getSession();

    // If there is no user email in the session, return null
    if (!session?.user?.email) {
      return null;
    }

    // Finding the user in the database using their email with 'prisma'
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // If the user is not found in the database, return null
    if (!currentUser) {
      return null;
    }

    // If the user is found, return the user object with some additional modifications
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(), // Convert the createdAt date to an ISO string
      updatedAt: currentUser.updatedAt.toISOString(), // Convert the updatedAt date to an ISO string
      emailVerified: currentUser.emailVerified?.toISOString() || null, // Convert the emailVerified date to an ISO string or return null if it's not set
    };
  } catch (error: any) {
    // If an error occurs during the process, return null
    return null;
  }
}
