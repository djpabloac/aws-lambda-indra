import SwapiApi from "../../../config/datasource/swapi.api"
import { CreatePlanetDto } from "../dto/create-planet.dto"
import { FinderByIdDto } from "../dto/finder-by-id.dto"
import { PlanetExternal } from "./planet.api.entity"

const mapPlanetExternalToPlanet = (raw: PlanetExternal): CreatePlanetDto => {
  const rotation_period = parseInt(raw.rotation_period)
  const orbital_period = parseInt(raw.orbital_period)
  const diameter = parseInt(raw.diameter)
  const population = parseInt(raw.population)

  return {
    nombre: raw.name,
    periodo_rotacion: isNaN(rotation_period) ? 0 : rotation_period,
    periodo_orbital: isNaN(orbital_period) ? 0 : orbital_period,
    diametro: isNaN(diameter) ? 0 : diameter,
    clima: raw.climate,
    gravedad: raw.gravity,
    terreno: raw.terrain,
    agua_superficial: parseInt(raw.surface_water),
    poblacion: isNaN(population) ? 0 : population,
    url: raw.url
  }
}

export const getPlanetOfSwapiById = async (finderById: FinderByIdDto): Promise<CreatePlanetDto> => {
  const data = await SwapiApi.getOne<PlanetExternal>(`/planets/${finderById.id}`)

  return mapPlanetExternalToPlanet(data)
}
