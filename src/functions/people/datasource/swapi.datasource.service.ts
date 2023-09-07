import SwapiApi from "../../../config/datasource/swapi.api"
import { CreatePeopleDto } from "../dto/create-people.dto"
import { FinderByIdDto } from "../dto/finder-by-id.dto"
import { PeopleExternal } from "./people.api.entity"

const mapPeopleExternalToPeople = (raw: PeopleExternal): CreatePeopleDto => ({
  nombre: raw.name,
  altura: parseInt(raw.height),
  masa: parseInt(raw.mass),
  color_pelo: raw.hair_color,
  color_piel: raw.skin_color,
  color_ojo: raw.eye_color,
  periodo_nacimiento: raw.birth_year,
  genero: raw.gender,
  nacionalidad: raw.homeworld,
  url: raw.url
})

export const getPeopleOfSwapiById = async (finderById: FinderByIdDto): Promise<CreatePeopleDto> => {
  const data = await SwapiApi.getOne<PeopleExternal>(`/people/${finderById.id}`)

  return mapPeopleExternalToPeople(data)
}
