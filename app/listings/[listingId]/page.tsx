import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

// Defining an interface 'IParams' with an optional property 'listingId' of type string
interface IParams {
  listingId?: string;
}

// Defining a function component 'ListingPage' that takes an object as an argument with a 'params' property of type 'IParams'
const ListingPage = async ({ params }: { params: IParams }) => {
  // Asynchronously fetching the listing using 'getListingById' with the 'params' passed as an argument
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser()

  // If the listing is not found or does not exist
  if (!listing) {
    // Return the following JSX elements
    return (
      // Render the 'ClientOnly' component which ensures this part is only rendered on the client-side
      <ClientOnly>
        {/* Render the 'EmptyState' component */}
        <EmptyState />
      </ClientOnly>
    );
  }

  // If the listing is found, return the JSX element with the title of the listing in a 'div' element with a class 'text-black'
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  )
};

export default ListingPage;
