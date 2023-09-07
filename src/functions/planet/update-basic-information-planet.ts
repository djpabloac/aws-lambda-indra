import { APIGatewayProxyHandler } from "aws-lambda";
import { errorHandler } from "../../utils/error-handler";
import { responseHandler } from "../../utils/response-handler";
import { FinderByIdDtoSchema } from "./dto/finder-by-id.dto";
import { UpdateBasicInformationPlanetDtoSchema } from "./dto/update-basic-information-planet.dto";
import { updateBasicInformationPlanetById } from "./services/planet.mysql.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const planetIdSafe = FinderByIdDtoSchema.safeParse(event.pathParameters)

    if (!planetIdSafe.success)
      return errorHandler(planetIdSafe.error)

    const planetSafe = UpdateBasicInformationPlanetDtoSchema.safeParse(JSON.parse(event.body ?? ''))

    if (!planetSafe.success)
      return errorHandler(planetSafe.error)

    const { id } = planetIdSafe.data
    const planetId = parseInt(id)

    const data = await updateBasicInformationPlanetById(planetId, planetSafe.data)

    return responseHandler(data)
  } catch (error) {
    return errorHandler(error)
  }
}
