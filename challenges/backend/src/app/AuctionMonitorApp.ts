import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IBuyerAuction } from "./services/models/IBuyerAuction";

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CarOnSaleClient)
    private carOnSaleClient: ICarOnSaleClient
  ) {}

  public async start(): Promise<void> {

    try {
      this.logger.log(`Auction Monitor started.`);
  
      // TODO: Retrieve auctions and display aggregated information (see README.md)
      const auctions: IBuyerAuction = await this.carOnSaleClient.getRunningAuctions();
  
      const totalNumberOfAuction = auctions?.items?.length;
      this.logger.log("Number of auctions: " + totalNumberOfAuction);
  
      // average number of bids on an auction
  
      const averageBid =
        auctions?.items?.reduce((acc, cur) => (acc += cur.numBids), 0) /
        (totalNumberOfAuction ? totalNumberOfAuction : 1);
  
        this.logger.log("Average number of bids on an auction: " + averageBid);
  
      // Average percentage of the auction progress
  
      const averageAuctionProgress =
        auctions?.items?.reduce(
          (acc, cur) =>
            (acc += cur.minimumRequiredAsk + cur.currentHighestBidValue),
          0
        ) / (totalNumberOfAuction ? totalNumberOfAuction : 1);
  
      const avgPercentageAuctionProgress = averageAuctionProgress * 0.01;
  
      this.logger.log(
        "Average percentage of the auction progress: " +
        avgPercentageAuctionProgress
      );
  
      process.exit(0);
      
    } catch (error) {
      this.logger.log(error.message);
      
      process.exit(1);
    }
  }
}
