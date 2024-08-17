
import { formSchema } from "@/app/create/backend/FormSchema"
import axios from "axios"
import { useEffect, useState } from "react"
import { z } from "zod"

export type Guests = {
  id: string
  number: number
  name: string
  url: string
  whatsapp: string
  email: string
  check: boolean
  nickmale: string
  nickfemale: string
  weddingId : string
}



export const useGuests  = (id:any) => {
  const [guests, setGuests] = useState<Guests[]>([]);

  useEffect(() => {
    axios.get(`/api/getGuestData?id=${id}`).then(response => {
      setGuests(response.data);
    }).catch(error => {
      console.error("Error fetching guest data:", error);
    });
  }, [id]);
  return guests
}

type FormSchema = z.infer<typeof formSchema>;



export const useInvitation = (id: string) => {
  const [invitation, setInvitation] = useState<FormSchema | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchInvitation = async () => {
      try {
        const response = await axios.get(`/api/getInvitationData?id=${id}`);
        console.log("RESPONSE", response)
        setInvitation(response.data);
      } catch (err) {
        console.error('Error fetching invitation data', err);
        setError(err);
      }
    };

    fetchInvitation();
  }, [id]);
  console.log("INVITE CONST", invitation)
  return { invitation, error };
};
