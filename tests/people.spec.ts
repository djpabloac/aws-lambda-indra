/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { handler as handlerFinderPeople } from "../src/functions/people/finder-people";
import { handler as handlerUpdatePeople } from "../src/functions/people/update-basic-information-people";

const { TOKEN_BEARER } = process.env

const Authorization = `Bearer ${TOKEN_BEARER}`

const updatePeople = {
  nombre: 'Sebastián Otto',
  periodo_nacimiento: '112BBY',
  genero: 'male',
  nacionalidad: "Perú"
}

describe('People', () => {
  let responseFinderPeople: APIGatewayProxyResult | null = null
  let parseBodyFinderPeople: any | null = null
  let responseUpdatePeople: APIGatewayProxyResult | null = null
  let parseBodyUpdatePeople: any | null = null

  beforeAll(async () => {
    // Finder
    const contextGet: Context = {
      functionName: 'finderPeople'
    } as any

    const eventGet: APIGatewayProxyEvent = {
      pathParameters: { id: '1' },
      headers: { Authorization }
    } as any

    responseFinderPeople = await handlerFinderPeople(eventGet, contextGet, () => { }) as APIGatewayProxyResult

    parseBodyFinderPeople = JSON.parse(responseFinderPeople.body)

    // Update
    const contextPost: Context = {
      functionName: 'updatePeople'
    } as any

    const evenPost: APIGatewayProxyEvent = {
      pathParameters: { id: parseBodyFinderPeople?.data?.id?.toString() ?? '' },
      body: JSON.stringify(updatePeople),
      headers: { Authorization }
    } as any

    responseUpdatePeople = await handlerUpdatePeople(evenPost, contextPost, () => { }) as APIGatewayProxyResult

    parseBodyUpdatePeople = JSON.parse(responseUpdatePeople.body)
  })

  describe('1. People was found correctly?', () => {
    test('statusCode is 200?', () => {
      expect(responseFinderPeople?.statusCode).toBe(200)
    })

    test('success is true?', () => {
      expect(parseBodyFinderPeople?.success).toEqual(true)
    })

    test('exists prop id?', () => {
      expect(parseBodyFinderPeople?.data).toHaveProperty('id')
    })
  })

  describe('2. People was updated correctly?', () => {
    test('statusCode is 200?', () => {
      expect(responseUpdatePeople?.statusCode).toBe(200)
    })

    test('success is true?', () => {
      expect(parseBodyUpdatePeople?.success).toEqual(true)
    })

    test('exists prop id?', () => {
      expect(parseBodyUpdatePeople?.data).toHaveProperty('id')
    })

    test('updated fields?', () => {
      const { nombre, periodo_nacimiento, genero, nacionalidad } = parseBodyUpdatePeople?.data ?? {}
      expect({ nombre, periodo_nacimiento, genero, nacionalidad }).toMatchObject(updatePeople)
    })

  })
})
