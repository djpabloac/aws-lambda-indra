import { APIGatewayProxyHandler } from "aws-lambda";
import { errorHandler } from "../../utils/error-handler";
import { responseHandler } from "../../utils/response-handler";
import { FinderByIdDtoSchema } from "./dto/finder-by-id.dto";
import { getPeopleById } from "./services/people.mysql.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const peopleSafe = FinderByIdDtoSchema.safeParse(event.pathParameters)

    if (!peopleSafe.success)
      return errorHandler(peopleSafe.error)

    const data = await getPeopleById(peopleSafe.data)

    return responseHandler(data)
  } catch (error) {
    return errorHandler(error)
  }
}