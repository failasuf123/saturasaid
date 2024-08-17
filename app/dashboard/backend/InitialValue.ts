import { guestSchema } from "./GuestSchema";
import {z} from 'zod'

type GuestSchema = z.infer<typeof guestSchema>;



const initialGuestValues: GuestSchema = {
    name: "",
    url: "",
    whatsapp: "",
    email: "",
    check: false,
    nickmale: "",
    nickfemale: "",
    weddingId: "",

}



  export {initialGuestValues}