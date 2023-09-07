import { z } from "zod";

const minLengthTree = 'A minimum of 3 digits is required'

const zString = z.string().min(1, 'Is required')
const zNumber = z.number().positive('Must be a positive number')
const zUrl = z.string().url('Incorrect format')

export const CreatePeopleDtoSchema = z.object({
  nombre: z.string().min(3, minLengthTree),
  altura: zNumber,
  masa: zNumber,
  color_pelo: zString,
  color_piel: zString,
  color_ojo: zString,
  periodo_nacimiento: zString,
  genero: zString,
  nacionalidad: zString,
  url: zUrl
})

export type CreatePeopleDto = z.infer<typeof CreatePeopleDtoSchema>