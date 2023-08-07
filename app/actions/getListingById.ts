import prisma from "@/app/libs/prismadb";

// Defining an interface 'IParams' with an optional property 'listingId' of type string
interface IParams {
  listingId?: string;
}

// Asynchronous function 'getListingById' that takes 'params' of type 'IParams' as an argument
export default async function getListingById(params: IParams) {
  try {
    // Destructuring the 'listingId' from the 'params' object
    const { listingId } = params;

    // Querying the 'listing' table in the database using Prisma's 'findUnique' method
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId, // Finding the listing by the provided 'listingId'
      },
      include: {
        user: true, // Including the 'user' relation in the query result
      },
    });

    // If the listing is not found in the database, return null
    if (!listing) {
      return null;
    }

    // If the listing is found, modify and return the listing object
    return {
      ...listing, // Spread the listing properties
      createdAt: listing.createdAt.toISOString(), // Convert the 'createdAt' date to an ISO string
      user: {
        ...listing.user, // Spread the user properties from the 'listing.user' object
        createdAt: listing.user.createdAt.toISOString(), // Convert the 'user.createdAt' date to an ISO string
        updatedAt: listing.user.updatedAt.toISOString(), // Convert the 'user.updatedAt' date to an ISO string
        emailVerified: listing.user.emailVerified?.toISOString() || null, // Convert the 'user.emailVerified' date to an ISO string or null if it's not set
      },
    };
  } catch (error: any) {
    // If an error occurs during the process, throw a new error with a custom message
    throw new Error(`[GETTING LISTING BY ID] ${error}`);
  }
}
