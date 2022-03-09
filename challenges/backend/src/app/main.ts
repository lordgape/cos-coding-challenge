import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { IApiClient } from "./services/Api/interface/IApiClient";
import { ApiClient } from "./services/Api/classes/ApiClient";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";

import * as dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

/*
 *   Initialize Enivironment
 */

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IApiClient>(DependencyIdentifier.APICLIENT).to(ApiClient);
container
  .bind<ICarOnSaleClient>(DependencyIdentifier.CarOnSaleClient)
  .to(CarOnSaleClient);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
  await app.start();
})();

export default app;
