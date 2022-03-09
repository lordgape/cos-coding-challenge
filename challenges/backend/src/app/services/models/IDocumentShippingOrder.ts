import IDocuments from "../models/IDocuments";

/**
 * This model describes an interface for auction data from the CarOnSale API.
 */
export default interface IDocumentShippingOrder {
  status: string;
  documents: [IDocuments];
}
