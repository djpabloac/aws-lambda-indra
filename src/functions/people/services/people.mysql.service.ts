import { CreatePeopleDto } from "../dto/create-people.dto";
import { FinderByIdDto } from "../dto/finder-by-id.dto";
import { UpdateBasicInformationPeopleDto } from "../dto/update-basic-information-people.dto";
import { People, PeopleCreate } from "../entity/people.entity";
import { getModel } from "../mysql/people.model";
import { getPeopleOfSwapiById } from "../datasource/swapi.datasource.service";

const mapToPeopleCreate = (raw: CreatePeopleDto): PeopleCreate => ({ ...raw })

export const createPeople = async (createPlanetDto: CreatePeopleDto): Promise<People> => {
  const parsePlanet = mapToPeopleCreate(createPlanetDto)

  const PeopleModel = await getModel()
  const newPeople = await PeopleModel.create(parsePlanet)
  const people = newPeople.toJSON()

  return people
}

export const getPeopleById = async (finderByIdDto: FinderByIdDto): Promise<People> => {
  const PeopleModel = await getModel()
  const people = await PeopleModel.findOne({
    where: {
      id: finderByIdDto.id
    }
  })

  if(people)
    return people.toJSON()

  const createPeopleDto = await getPeopleOfSwapiById(finderByIdDto)

  return createPeople(createPeopleDto)
}

export const updateBasicInformationPeopleById = async(id: number, updateDto: UpdateBasicInformationPeopleDto): Promise<People> => {
  const PeopleModel = await getModel()

  const people = await PeopleModel.findOne({
    where: {
      id
    }
  })

  if(!people)
    throw new Error('People not found')

  people.set({
    nombre: updateDto.nombre,
    periodo_nacimiento: updateDto.periodo_nacimiento,
    genero: updateDto.genero,
    nacionalidad: updateDto.nacionalidad
  })

  await people.save()

  return people.toJSON()
}