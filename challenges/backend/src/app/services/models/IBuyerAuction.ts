/**
 * This model describes an interface to access Buyer auction data from the CarOnSale API.
 */

import { IAuction } from "./IAuction";

export interface IBuyerAuction {
  items: [IAuction];
  page: number;
  total: number;
}
