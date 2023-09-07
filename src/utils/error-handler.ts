import { ZodError } from "zod"

export const errorHandler = async (error: unknown) => {
  if (error instanceof ZodError) {
    const errors = error.errors.map((e) => e.message)

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Errors ZodError',
        errors
      }, null, 2)
    }
  }

  const errors: string[] = error instanceof Error ? [error.message] : []

  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: 'Error internal',
      errors
    }, null, 2)
  }
}