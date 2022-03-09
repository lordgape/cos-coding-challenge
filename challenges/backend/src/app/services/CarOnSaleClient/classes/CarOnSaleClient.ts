import { inject, injectable } from "inversify";
import { IApiClient } from "../../Api/interface/IApiClient";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IBuyerAuction } from "../../models/IBuyerAuction"

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  public constructor(
    @inject(DependencyIdentifier.APICLIENT) private apiclient: IApiClient
  ) {}

  getRunningAuctions(): Promise<IBuyerAuction> {
    const url = `${process.env.baseURL}/v2/auction/buyer/?filter=""&count=false`;

    return this.apiclient.get(url);
  }
}


