import SwapiApi from "../../../config/datasource/swapi.api"
import { CreatePlanetDto } from "../dto/create-planet.dto"
import { FinderByIdDto } from "../dto/finder-by-id.dto"
import { PlanetExternal } from "./planet.api.entity"

const mapPlanetExternalToPlanet = (raw: PlanetExternal): CreatePlanetDto => ({
  nombre: raw.name,
  periodo_rotacion: parseInt(raw.rotation_period),
  periodo_orbital: parseInt(raw.orbital_period),
  diametro: parseInt(raw.diameter),
  clima: raw.climate,
  gravedad: raw.gravity,
  terreno: raw.terrain,
  agua_superficial: parseInt(raw.surface_water),
  poblacion: parseInt(raw.population),
  url: raw.url
})

export const getPlanetOfSwapiById = async (finderById: FinderByIdDto): Promise<CreatePlanetDto> => {
  const data = await SwapiApi.getOne<PlanetExternal>(`/planets/${finderById.id}`)

  return mapPlanetExternalToPlanet(data)
}
