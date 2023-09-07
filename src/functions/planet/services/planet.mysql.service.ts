import { CreatePlanetDto } from "../dto/create-planet.dto";
import { FinderByIdDto } from "../dto/finder-by-id.dto";
import { UpdateBasicInformationPlanetDto } from "../dto/update-basic-information-planet.dto";
import { Planet, PlanetCreate } from "../entity/planet.entity";
import { getModel } from "../mysql/planet.model";
import { getPlanetOfSwapiById } from "../datasource/swapi.datasource.service";

const mapToPlanetCreate = (raw: CreatePlanetDto): PlanetCreate => ({ ...raw })

export const createPlanet = async (createPlanetDto: CreatePlanetDto): Promise<Planet> => {
  const parsePlanet = mapToPlanetCreate(createPlanetDto)

  const PlanetModel = await getModel()
  const newPlanet = await PlanetModel.create(parsePlanet)
  const planet = newPlanet.toJSON()

  return planet
}

export const getPlanetById = async (finderByIdDto: FinderByIdDto): Promise<Planet> => {
  const PlanetModel = await getModel()
  const foundPlanet = await PlanetModel.findOne({
    where: {
      id: finderByIdDto.id
    }
  })

  if(foundPlanet)
    return foundPlanet.toJSON()

  const createPlanetDto = await getPlanetOfSwapiById(finderByIdDto)

  return createPlanet(createPlanetDto)
}

export const updateBasicInformationPlanetById = async(id: number, updateDto: UpdateBasicInformationPlanetDto): Promise<Planet> => {
  const PlanetModel = await getModel()

  const planet = await PlanetModel.findOne({
    where: {
      id
    }
  })

  if(!planet)
    throw new Error('Planet not found')

  planet.set({
    nombre: updateDto.nombre,
    poblacion: updateDto.poblacion
  })

  await planet.save()

  return planet.toJSON()
}
