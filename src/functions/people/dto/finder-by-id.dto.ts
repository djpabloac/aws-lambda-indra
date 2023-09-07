import { z } from "zod";

export const FinderByIdDtoSchema = z.object({
  id: z.string().min(1, 'Id is required')
})

export type FinderByIdDto = z.infer<typeof FinderByIdDtoSchema>