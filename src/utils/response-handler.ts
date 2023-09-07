export const responseHandler = async <T>(data: T) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      data
    }, null, 2)
  }
}