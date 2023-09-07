import { APIGatewayProxyHandler } from "aws-lambda";
import { errorHandler } from "../../utils/error-handler";
import { responseHandler } from "../../utils/response-handler";
import { FinderByIdDtoSchema } from "./dto/finder-by-id.dto";
import { getPlanetById } from "./services/planet.mysql.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const planetSafe = FinderByIdDtoSchema.safeParse(event.pathParameters)

    if (!planetSafe.success)
      return errorHandler(planetSafe.error)

    const data = await getPlanetById(planetSafe.data)

    return responseHandler(data)
  } catch (error) {
    return errorHandler(error)
  }
}