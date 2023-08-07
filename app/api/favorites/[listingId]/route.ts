import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// Function to handle HTTP POST requests
export async function POST(request: Request, { params }: { params: IParams }) {
  // Fetch the current user's data
  const currentUser = await getCurrentUser();

  // If no current user is found, return an error response
  if (!currentUser) {
    return NextResponse.error();
  }

  // Extract the 'listingId' from the 'params'
  const { listingId } = params;

  // If 'listingId' is missing or not a string, throw an "Invalid ID" error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Create a copy of the user's 'favoriteIds' array (or an empty array if it's not present) and add the new 'listingId'
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  // Update the user's data in the database with the new 'favoriteIds'
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return a JSON response containing the updated user object
  return NextResponse.json(user);
}

// Function to handle HTTP DELETE requests
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // Fetch the current user's data
  const currentUser = await getCurrentUser();

  // If no current user is found, return an error response
  if (!currentUser) {
    return NextResponse.error();
  }

  // Extract the 'listingId' from the 'params'
  const { listingId } = params;

  // If 'listingId' is missing or not a string, throw an "Invalid ID" error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Create a copy of the user's 'favoriteIds' array (or an empty array if it's not present) and filter out the specified 'listingId'
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Update the user's data in the database with the new 'favoriteIds'
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return a JSON response containing the updated user object
  return NextResponse.json(user);
}
