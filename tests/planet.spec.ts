/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { handler as handlerFinderPlanet } from "../src/functions/planet/finder-planet";
import { handler as handlerUpdatePlanet } from "../src/functions/planet/update-basic-information-planet";

const { TOKEN_BEARER } = process.env

const Authorization = `Bearer ${TOKEN_BEARER}`

const updatePlanet = {
  nombre: 'Triton',
  poblacion: 50000
}

describe('Planet', () => {
  let responseFinderPlanet: APIGatewayProxyResult | null = null
  let parseBodyFinderPlanet: any | null = null
  let responseUpdatePlanet: APIGatewayProxyResult | null = null
  let parseBodyUpdatePlanet: any | null = null

  beforeAll(async () => {
    // Finder
    const contextGet: Context = {
      functionName: 'finderPlanet'
    } as any

    const eventGet: APIGatewayProxyEvent = {
      pathParameters: { id: '1' },
      headers: { Authorization }
    } as any

    responseFinderPlanet = await handlerFinderPlanet(eventGet, contextGet, () => { }) as APIGatewayProxyResult

    parseBodyFinderPlanet = JSON.parse(responseFinderPlanet.body)

    // Update
    const contextPost: Context = {
      functionName: 'updatePlanet'
    } as any

    const eventPost: APIGatewayProxyEvent = {
      pathParameters: { id: parseBodyFinderPlanet?.data?.id?.toString() ?? '' },
      body: JSON.stringify(updatePlanet),
      headers: { Authorization }
    } as any

    responseUpdatePlanet = await handlerUpdatePlanet(eventPost, contextPost, () => { }) as APIGatewayProxyResult

    parseBodyUpdatePlanet = JSON.parse(responseUpdatePlanet.body)
  })

  describe('1. Planet was found correctly?', () => {
    test('statusCode is 200?', () => {
      expect(responseFinderPlanet?.statusCode).toBe(200)
    })

    test('success is true?', () => {
      expect(parseBodyFinderPlanet?.success).toEqual(true)
    })

    test('exists prop id?', () => {
      expect(parseBodyFinderPlanet?.data).toHaveProperty('id')
    })
  })

  describe('2. Planet was updated correctly?', () => {
    test('statusCode is 200?', () => {
      expect(responseUpdatePlanet?.statusCode).toBe(200)
    })

    test('success is true?', () => {
      expect(parseBodyUpdatePlanet?.success).toEqual(true)
    })

    test('exists prop id?', () => {
      expect(parseBodyUpdatePlanet?.data).toHaveProperty('id')
    })

    test('updated fields?', () => {
      const { nombre, poblacion } = parseBodyUpdatePlanet?.data ?? {}
      expect({ nombre, poblacion }).toMatchObject(updatePlanet)
    })
  })
})




