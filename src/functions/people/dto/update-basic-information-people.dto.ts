import { z } from "zod";

const minLengthTree = 'A minimum of 3 digits is required'

const zString = z.string().min(1, 'Is required')

export const UpdateBasicInformationPeopleDtoSchema = z.object({
  nombre: z.string().min(3, minLengthTree),
  periodo_nacimiento: zString,
  genero: zString,
  nacionalidad: zString
})

export type UpdateBasicInformationPeopleDto = z.infer<typeof UpdateBasicInformationPeopleDtoSchema>
