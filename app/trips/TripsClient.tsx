'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
  }

const TripsClient: React.FC<TripsClientProps> = ({
  reservations, currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")


  // Function that will cancel the reservation.
  const onCancel = useCallback((id: string) => {
    // Use my function to change "deletingId" and set it to the id that is passed through
    setDeletingId(id)

    // Make my request to my api to delete the reservation by the id being passed through
    axios.delete(`/api/reservations/${id}`)
    // If successfully, throw a toast success, then refresh the page
    .then(() => {
      toast.success('Reservation canceled')
      router.refresh()
    })
    // if there is an error, throw the error into a toast
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    // after all of that make sure to set the "deletingId" back to empty string
    .finally(() => {
      setDeletingId('')
    })
  }, [router])

  return ( 
    <Container>
      <Heading title="Trips" subtitle="Where you've been, and where you're going" / >
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 mg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation) => (
            <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingId == reservation.id} actionLabel="Cancel reservation" currentUser={currentUser} />
          ))}
        </div>
    </Container>
  );
}

export default TripsClient;