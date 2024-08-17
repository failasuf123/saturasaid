import z from 'zod'

const guestSchema = z.object({
    name: z.string().optional(),
    url: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().optional(),
    check: z.boolean().optional(),
    nickmale: z.string().optional(),
    nickfemale: z.string().optional(),
    weddingId: z.string().nullable().optional(),
  });

export {guestSchema}

