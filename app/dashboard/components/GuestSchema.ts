import z from 'zod'

const guestSchema = z.object({
    name: z.string(),
    url: z.string(),
    whatsapp: z.string(),
    email: z.string(),
    check: z.boolean(),
    weddingId: z.string().nullable(),
  });

export {guestSchema}

