import { config } from "..";
import { DataSource } from ".";

class SwapiDataSource extends DataSource {
  constructor() {
    super(`${config.apiExternal.swapApi}/api`)
  }
}

const SwapiApi = new SwapiDataSource()

export default SwapiApi