import { APIGatewayProxyHandler } from "aws-lambda";
import { errorHandler } from "../../utils/error-handler";
import { responseHandler } from "../../utils/response-handler";
import { FinderByIdDtoSchema } from "./dto/finder-by-id.dto";
import { UpdateBasicInformationPeopleDtoSchema } from "./dto/update-basic-information-people.dto";
import { updateBasicInformationPeopleById } from "./services/people.mysql.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const peopleIdSafe = FinderByIdDtoSchema.safeParse(event.pathParameters)

    if (!peopleIdSafe.success)
      return errorHandler(peopleIdSafe.error)

    const peopleSafe = UpdateBasicInformationPeopleDtoSchema.safeParse(JSON.parse(event.body ?? ''))

    if (!peopleSafe.success)
      return errorHandler(peopleSafe.error)

    const { id } = peopleIdSafe.data
    const peopleId = parseInt(id)

    const data = await updateBasicInformationPeopleById(peopleId, peopleSafe.data)

    return responseHandler(data)
  } catch (error) {
    return errorHandler(error)
  }
}