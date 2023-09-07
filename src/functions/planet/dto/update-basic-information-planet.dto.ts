import { z } from "zod";

const minLengthTree = 'A minimum of 3 digits is required'
const zNumber = z.number().positive('Must be a positive number')

export const UpdateBasicInformationPlanetDtoSchema = z.object({
  nombre: z.string().min(3, minLengthTree),
  poblacion: zNumber
})

export type UpdateBasicInformationPlanetDto = z.infer<typeof UpdateBasicInformationPlanetDtoSchema>