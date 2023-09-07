import fetch from "cross-fetch";

export class DataSource {
  constructor(private readonly api: string) { }

  private getEndPoint(path: string) {
    return `${this.api}${path}`
  }

  async getOne<T>(path: string): Promise<T> {
    const endpoint = this.getEndPoint(path)

    const response = await fetch(endpoint, {
      method: 'GET'
    })

    const data = await response.json()

    return data as T;
  }
}
