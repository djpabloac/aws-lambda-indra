import { z } from "zod";

const minLengthTree = 'A minimum of 3 digits is required'

const zString = z.string().min(1, 'Is required')
const zNumber = z.number().positive('Must be a positive number')

export const CreatePlanetDtoSchema = z.object({
  nombre: z.string().min(3, minLengthTree),
  periodo_rotacion: zNumber,
  periodo_orbital: zNumber,
  diametro: zNumber,
  clima: zString,
  gravedad: zString,
  terreno: zString,
  agua_superficial: zNumber,
  poblacion: zNumber,
  url: z.string().url('Incorrect format')
})

export type CreatePlanetDto = z.infer<typeof CreatePlanetDtoSchema>