import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import { Container } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

describe("CarOnSaleClient", () => {
  let sandbox: sinon.SinonSandbox;
  let container: Container;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    container = new Container({
      defaultScope: "Singleton",
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should call getRunningAuctions once", async () => {
    const CarOnSaleClientStub = {
      getRunningAuctions: sinon.stub(),
    };

    container
      .bind<ICarOnSaleClient>(DependencyIdentifier.CarOnSaleClient)
      .toConstantValue(CarOnSaleClientStub);

    let carOnSaleClient = container.get<ICarOnSaleClient>(
      DependencyIdentifier.CarOnSaleClient
    );
    await carOnSaleClient.getRunningAuctions();
    expect(CarOnSaleClientStub.getRunningAuctions.callCount).eql(1);
  });
});
