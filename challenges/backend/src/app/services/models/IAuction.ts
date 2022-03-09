import IDocumentShippingOrder from '../models/IDocumentShippingOrder'
import IAuctionFieldConfirmationStatusMap from "../models/IAuctionFieldConfirmationStatusMap"
import IVehicle from "./IVehicle"

/**
 * This model describes an interface for auction data from the CarOnSale API.
 */
export interface IAuction {

    /*  
    * The label of the auction, consisting of the vehicle make, model and date of first registration (EZ). 
    */
    label:	string
  
    /* The state of the auction, indicating whether an auction is not yet published (DRAFTED), running (ACTIVE),
    * closed successfully (CLOSED_WAITING_FOR_PAYMENT, CLOSED_WAITING_FOR_PICKUP, FINISHED), failed (CLOSED_NO_BIDS,
    * CLOSED_BELOW_MIN_ASK) or disabled (DISABLED).    
    * Depending on the state, different timestamps are available per auction.    
    * Enum:
    * Array [ 10 ] 
    */
    state:	number

    // The exact date+time when the auction is expiring/ending.
    endingTime:	string // ($date-time)
    
    /*
    *  The remaining number of seconds that this auction will be in the state ACTIVE (running).    
    * This is a dynamic, non-persisted field, calculated on every retrieval of the auction data.
    */
    remainingTimeInSeconds:	number // ($double)
   
    /*
    * The remaining number of seconds that this auction is available for instant purchase
    (usually the first 24 hours after the auction is started).    
    * This is a dynamic, non-persisted field, calculated on every retrieval of the auction data.
    */
    remainingTimeForInstantPurchaseInSeconds:number // ($double)
   
    /* 
    * Date+time when the auction is started.
    * When an auction is started right away (without drafting), the "createdAt" and "startedAt" should have
    * (roughly) the same values. 
    */
    startedAt:	string // ($date-time)
    
    /* Date+time when the auction is "confirmed to be sold" by the seller (or by an admin).
    * If an auction is ending equal or above the minimum required ask, the "purchaseConfirmedAt"
    * will automatically be set and will be equal to the "endingTime".
    *
    * If an auction is ending below the minimum ask (CLOSED_BELOW_MIN_ASK), the "purchaseConfirmedAt" timestamp
    * is only set if the auction is then manually "confirmed" by the seller or an admin.
    *
    * If an auction is never "successful", the "purchaseConfirmedAt" will remain "null".
    
    * This value was introduced in the course of 2019. For all previous auctions, the endingTime was set
    * as the "purchaseConfirmedAt" retrospectively. 
    */
    purchaseConfirmedAt:	string // ($date-time)
    
    /* 
    * Date-time when the auction has definitely been rejected by a seller or an admin, after the auction
    * ended below minimum required ask.
    *
    * This value is only available since 2019/07/29. All auctions rejected before that date have the value "null".
    *
    * rejectionReason*	number
    * Indicates the reason that an auction failed the renegotiation process.
    *
    * Enum:
    * Array [ 5 ] 
    * 
    */
    purchaseRejectedAt:	string  // ($date-time)
    
   /*  
    * Elaborates on the rejection reason to provide further context to why an
    * auction was rejected during the renegotiation process. 
    */
    
    rejectionReasonNote:	string
    
    /* 
    * Value that is indicating initial bid value auction should be started with. 
    */
    startingBidValue:	number // ($double)
    
    
    startingBidValueNet:	number // ($double)

    /* 
    * Value that is indicating the current highest bid value on the auction.
    * This is of course a dynamic field, that will be incremented on every new bid placed on the auction. 
    */
    currentHighestBidValue:	number // ($double)
    
    
    currentHighestBidValueNet:	number // ($double)
   /*
    * Value that is indicating the highest bid value on the auction when it ended.
    * This value should not change for a given auction since it supposed to be a historical record. 
    */
    highestBidValueAtEndingTime:	number // ($double)
  
    
    highestBidValueAtEndingTimeNet:	number // ($double)

    /* The minimal price the seller user wants to reach for this specific auction.
    * If an auction ends above that price, the auction is successful right away
    * (switching to state CLOSED_WAITING_FOR_PAYMENT).
    
    * If the auction ends below the minimum required ask, the auction will switch to state CLOSED_BELOW_MIN_ASK,
    * which then requires the seller's explicit "confirmation" or "rejection" of the highest bid value. 
    */
    minimumRequiredAsk:	number // ($double)
    
    
    minimumRequiredAskNet:	number // ($double)

    /* 
    * If an auction is ending below the minimum required ask, the "originalMinimumRequiredAsk" will be set to the
    * "minimumRequiredAsk" value before it is set to "currentHighestBidValue". 
    */
    originalMinimumRequiredAsk:	number // ($double)
   
    
    originalMinimumRequiredAskNet:	number // ($double)
    /* 
    * number of bids placed on an auction.
    */
    numBids:	number // ($double)
    
    /*
    * The purchase price for the vehicle that is auctioned.
    * This is set manually by the seller, and is mostly used to analyze the "real" margin that a seller
    * makes with an auction. 
    */
    purchasePrice:	number // ($double)
    
    
    purchasePriceNet:	number // ($double)
    associatedVehicle:	IVehicle
    /* 
    * Indicates whether the auction process is rated by the SellerUser.
    */
    isRatedByDealership:	boolean
    
    /* 
    * Indicates whether the auction process is rated by the BuyerUser.
    */
    isRatedByBuyer:	boolean
    
    /* 
    * Indicates whether the BuyerUser has marked this auction as paid (payment of the auction volume).
    * This is done manually by the BuyerUser, so this value is not indicating that the actual payment has really
    * reached the seller. 
    */
    isPaidByBuyer:	boolean
   
    /* 
    * Timestamp when the BuyerUser has marked this auction as "paid" (i.e. set the "isPaidByBuyer"). 
    */
    outgoingPaymentConfirmedAt:	string // ($date-time)
   
    /* 
    * Timestamp when the SellerUser has confirmed that the payment has reached the seller bank account. 
    */
    incomingPaymentConfirmedAt:	string // ($date-time)
    
    /* 
    * Timestamp when the auction state has changed from "CLOSED_WAITING_FOR_PAYMENT" to "CLOSED_WAITING_FOR_PICKUP". 
    */
    pickupConfirmedAt:	string // ($date-time)
    
    /* 
    * Physical address of where the vehicle on auction is located (a.k.a. pickup address).
    * Enum:
    * Array [ 32 ]
    */
    locationCountryCode:	string
    
    locationAddress:	string
    locationCity:	string
    locationZip:	string
    /* 
    * Indicating to which bank account the BuyerUser has to transfer the auction volume to. 
    */
    sellerIban:	string
    
    /* 
    * URL to the seller invoice for the given auction, manually uploaded by the SellerUser, after
    * the auction has ended successfully. 
    */
    
    urlToInvoice:	string
    
    /* 
    * Flag indicating whether an auction has an "hot bid" phase in the last 20 seconds before expiration. 
    */
    hotBid:	boolean
    
    /* 
    * Seller's instant purchase price for the vehicle.
    * For the first 24 hours after the auction is started, the vehicle will only be available in "instant purchase"
    * mode (bidding is not allowed in that time, only purchasing right away).
    
    * After 24 hours, if nobody purchased the vehicle, it is going on auction, just like all other auctions.
    */
    instantPurchasePrice:	number //($double)
   
    
    instantPurchasePriceNet:	number //($double)
    
    /* 
    * Flag indicating that instant purchase is enabled for that auction.
    * (Implies that "instantPurchasePrice" is set)
    
    * didEndWithInstantPurchase*	boolean
    * Flag indicating that an auction "ended" with an instant purchase, resp.
    * did never go on auction. 
    */
    allowInstantPurchas:	boolean
   
    /* 
    * Date+time indicating until when an auction is available for instant purchasing.
    * By default, this is 24 hours after the start of an auction. 
    */
    instantPurchasePossibleUntil:	string // ($date-time)
    
    /*
    * Internal counter, incrementing on every "restart" of an auction.
    * Starts with 0.
    
    * e.g. count of 2 means that the auction has been restarted 2 times, leading to 3 auction objects in the
    * database. 
    */
    auctioningIterations:	number  //($double)
    
    /* 
    * Indicating the strategic priority of an auction for CarOnSale.de
    * The higher the number, the more "relevant" the auction is. 
    */
    priority:	number // ($double)    
    
    advertisementHtmlContent:	string

    /* 
    * Enum:
    * Array [ 6 ] 
    */
    buyerComplaint:	number
   
   /*  
   * Custom field that is not used internally.
   * Allows sellers to store e.g. a reference ID to their own vehicle management system. 
   */
    internalReferenceText:	string
    
    
    _fk_uuid_vehicle:	string
    _fk_uuid_sellerUser:	string
    _fk_uuid_highestBiddingBuyerUser:	string

    /* 
    * This is a URL that redirects to an external invoice payment site (such as provided by Stripe). 
    */
    urlToPaymentSite:	string
    
    
   /* 
   * A flag indicating if an auction needs to be reviewed by an internal review agent (for quality assurance)
   * If true, an auction is currently under review by CarOnSale, and cannot be edited by the owning seller user. 
   */
    needsReview:	boolean
    
    /* 
    * The reason why an auction was rejected during the review. 
    * Enum:
    * Array [ 21 ]
    */
    reviewReaso:	number
    
    /* 
    * The comment given by an internal review agent on rejecting an auction under review. 
    */    
    reviewComment:	string
   
    /* 
    * Random PIN code that is generated when an auction is ready to be picked up or in advance before COSCheck inspection.
    * This PIN code is printed out on the hangar in the vehicle or handed to the seller of the auction, which can then forward it to
    * the buyer to confirm the pickup. 
    */
    pickupPinCode:	string
   
    /* 
    * Random UUID that is used to confirm vehicle pickup via scanning QR code.
    * It will be printed on the hangar or in the pickup document available for sellers. 
    */
    pickupPinUuid:	string
   
    /* 
    * Timestamp when PIN code was entered by the buyer.
    * Allows to determine how many auctions were self-picked up. 
    */
    pickupPinCodeEnteredAt:	string // ($date-time)
    
    /* 
    * Timestamp when PIN UUID was entered by the buyer via scanning QR code.
    * Allows to determine how many auctions were self-picked up. 
    */
    pickupPinUuidEnteredAt:	string  //($date-time)
    
    /* 
    * Flag is indicating if pickup was confirmed with PIN using new process (via pin.caronsale.de) 
    */
    pickupConfirmedWithNewPin:	boolean
    
    /* 
    * URL to the pickup information document for the BuyerUser. 
    */
    urlToPickupBuyerDocument:	string
    
    /* 
    * URL to the pickup information document for the SellerUser (containing the "pickupPinCode"). 
    */
    urlToPickupSellerDocument:	string
    
    /* 
    * The payment process that is used to pay money for the purchase volume (auction volume). 
    * Enum:
    * Array [ 3 ]
    */
    paymentProcess:	number
    
    
    /* 
    * Referencing the bank account to which the payment for the purchase volume should be paid out.
    * This is null, if the paymentProcess === "CLASSIC".    
    * It is only used, when external payment (COS Payment) is enabled. 
    * */
    _fk_uuid_associatedBankAccount:	string
    
    /* 
    * Indicates how often an auction has been reviewed.
    * This is incremented every time an auction is rejected after a review. 
    */
    draftReviewIterations:	number // ($double)
    
    /* 
    * Timestamp when an admin resets a time window for a possibility to complain 
    */
    complaintTimeWindowExtendedAt:	string // ($date-time)
    
    /* 
    * Flag indicates if this auction is suspected to have been paid in cash (only for auctions that use the external
    * invoice process), this means that no corresponding transfer exists on Stripe and the buyer confirmed the pickup
    * through the seller pin code. 
    */
    isSuspectedCashPayment:	boolean
    
    /* 
    * Timestamp when the auction was send to review. 
    */
    reviewStartedAt:	string // ($date-time)
    
    /* 
    * The reference to the original auction from which current one was cloned. 
    */
    _fk_uuid_clonedFrom:	string
    
    /* 
    * Auction type. 
    Enum:
    Array [ 3 ]
    */
    type:	number
    
    
    /* 
    * Indicates whether the rejection wait period for this auction is over and thus can be rejected by the seller. 
    */
    isRejectionWaitPeriodOver:	boolean
    
    /* 
    * Reference to invoice object for the external Billomat invoicing provider. 
    */
    thirdPartyVehiclePurchaseInvoiceReference:	string
    
    /* 
    * URL to the seller made invoice invoicing CoS for the given auction, manually uploaded to the crm by an internal user, after
    * the auction has ended successfully. 
    */
    sellerToCosInvoiceUrl:	string
    
    /* 
    * Timestamp for when the sellerToCosInvoiceUrl was last updated. 
    */
    sellerToCosInvoiceUrlLastUpdatedAt:	string // ($date-time)
    

    /* 
    * Flag indicating wherever the uploaded seller to cos invoice was verified by an internal user. 
    */
    sellerToCosInvoiceIsValid:	boolean
    
    /* 
    * The comment given by an internal user on the provided seller to cos invoice. 
    */
    sellerToCosInvoiceComment:	string
    
    /* 
    * Shows if auction is marked as 'live', so, it will be slotted during starting and expire in less than 24 hours. 
    */
    isLive:	boolean
    
    /* 
    * Indicating if transportation should be disabled manually. 
    */
    isTransportationDisabledManually:	boolean
    
    /* 
    * Optional pickup instructions that will be communicated to the buyer. 
    */
    pickupInstructions:	string
    
    /* 
    * Indicating wherever the seller should be charged a success/listing fee. 
    */
    preventSellerFactoring:	boolean
    
    /* 
    * Indicating if buyer success fee should be applied or not. 
    */
    applyBuyerSuccessFe:	boolean
    
    
    documentShippingOrder:	IDocumentShippingOrder
    fieldsConfirmationStatus:	IAuctionFieldConfirmationStatusMap
    /* 
    * Whether the "Value Added Tax is reportable", a special tax condition in the EU.
    * If this is true, it means that the vehicle is "Regelbesteuert", meaning that the invoice for the vehicle
    * (either invoiced directly from seller to buyer - or from COS Payment to buyer) needs to include
    * the VAT (in Germany e.g. 19%) in the invoice.
    
    * If this is false, the invoice does not need to have explicit VAT. 
    */
    isVATReportable:	boolean
   
    
    id: 	number // ($double)

    /* 
    * Indicating the time when the entity has been created, i.e. when the entity was
    * persisted to the database. 
    */
    createdAt:	string // ($date-time)
   
    /* 
    * Indicating the last time a value of the entity has been changed (updated). 
    */
    updatedAt?:	string // ($date-time)
    
    /* 
    * Indicating the time when the entity has been (softly) deleted.
    * "null" if entry is not deleted. 
    */
    deletedAt?:	string // ($date-time)
    
    
    uuid:	string
    /* Stores which type of additional tax applies to the auction if any.
    
    * Enum:
    * Array [ 5 ] 
    */
    additionalTaxType:	number
    /* 
     * Stores the value of the additional tax that might apply to an auction. 
     */
    additionalTaxValue:	number // ($double)
    
    
    lastOfferBySeller:	number // ($double)
    lastOfferBySellerNet:	number // ($double)
    buyerRecommendationScore:	number // ($double)
    
    /* 
    *  Was this auction created with the help of an inspection done or commissioned by CarOnSale? 
    */
    inspectionWasCommissionedByCos:	boolean
    
    /* 
    * By which type of user was this auction created. 
    * Enum:
    * Array [ 3 ]
    */
    creatorType:	number
    
    
    /* 
    * UUID of the creating internal user if there is one. 
    */
    _fk_uuid_creatingInternalUser:	string
    
    /*
    * Indicates if the auction was created for testing purposes and
    * should be handled differently: it should not be ended automatically,
    * so the seller should decide would he like to sell it or not. 
    */
    isTest:	boolean
    
    /* 
    * Indicates if minimum required ask should be displayed for buyers. 
    */
    displayMinAsk:	boolean
    
    /* 
    * GPS coordinates of the auction (can be used for e.g. calculating distances between auctions and buyers). 
    */
    locationGeoLat:	number // ($double)
    

    
    locationGeoLon:	number // ($double)

    /* 
    * A value denoting the previous renegotiation offer given by a buyer user. 
    */
    previousCounterOfferByBuyer: 	number // ($double)
    
    
    previousCounterOfferByBuyerNet:	number // ($double)

    /* 
    * A value denoting the previous renegotiation offer given by a seller user.
    * This is required in order to properly display the right information during the renegotiation process. 
    */
    previousLastOfferBySeller:	number // ($double)
    
    
    previousLastOfferBySellerNet:	number // ($double)

    /* 
    * A flag for if the seller user connected to the auction has decided not to participate in the renegotiation any further. 
    */
    renegotiationStoppedBySeller:	boolean
    
    /* 
    * A flag for if the highest bidding buyer user connected to the auction has decided not to participate in the renegotiation any further. 
    */
    renegotiationStoppedByBuyer:	boolean
    
    /* 
    * A fag indicating if the buyer's withdrawal from the renegotiation process was done automatically or not. 
    */
    wasRenegotiationStoppageByBuyerAutomatic:	boolean
    
    /* 
    * A fag indicating if the seller's withdrawal from the renegotiation process was done automatically or not. 
    */
    wasRenegotiationStoppageBySellerAutomatic:	boolean
    
    /*
    * The total number of offer rounds a buyer has participated in for an auction during the renegotiation phase. 
    */
    numBuyerRenegotiationOfferRounds:	number // ($double)
    
    /*
    * The total number of offer rounds a seller has participated in for an auction during the renegotiation phase. 
    */
    numSellerRenegotiationOfferRounds:	number // ($double)
    
    /*
    * The calculated renegotiation midpoint value of the auction.
    * This is used once the renegotiation offers get too close for the offer process to continue.
    * This value will be undefined unless the auction is ready to be purchased for such a value. 
    */
    renegotiationMidpointValue:	number // ($double)
    
    
    renegotiationMidpointValueNet:	number // ($double)
    
    /* 
    * Indicates that the highest bidding buyer user for an auction in renegotiation is willing to accept the midpoint of their offer and
    * the offer of the seller for the same auction. This is used when the renegotiation offers get very close during the renegotiation process. 
    */
    buyerAcceptedRenegotiationMidpoint:	boolean
    
    /*
    * Indicates that the seller of an auction is willing to accept the midpoint of their offer and the offer of the highest bidding
    * buyer user for the same auction. This is used when the renegotiation offers get very close during the renegotiation process. 
    */
    sellerAcceptedRenegotiationMidpoint:	boolean
    
    /*
    * This is the datetime object denoting when the most recent renegotiation round concluded at. 
    */
    lastRenegotiationRoundEndedAt:	string // ($date-time)
    
    
    /*
    * The number of seconds until the current renegotiation round times out. 
    */
    numSecondsUntilRenegotiationTimeout:	number //($double)
    
    
    counterOfferByBuyer:	number // ($double)
    counterOfferByBuyerNet:	number // ($double)

    /*
    * This is a reference (e.g. primary key) to a resource in an external invoicing service (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the transfer of funds
    * for the vat deposit from COS to the deposit account (only relevant for cross border transactions).
    * This deposit is refunded by COS once the buyer provides the necessary documentation for a cross border transaction. 
    */
    thirdPartyVATDepositTransferReference:	string
    
    /* 
    * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the transfer of funds
    * for the auction additional taxes (e.g country specific luxury taxes): from COS to the seller.
    */
    thirdPartyAdditionalTaxTransferReference:	string
    
    /* 
    * This is a reference (e.g. primary key) to a resource in an external invoicing service (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the transfer of funds
    * for the VAT: from COS to the seller (only relevant for cross border transactions for now).
    * COS is advancing the vat amount to the seller.
    */
    thirdPartyVatTransferReference:	string
    
    /*  
    * This is a reference (e.g. primary key) to a resource in an external invoicing service (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the charge of funds
    * for the auction volume from the buyer to COS.
    */
    thirdPartyVolumeChargeReference:	string
    
    /*  
    * This is a reference (e.g. primary key) to a resource in an external invoicing service (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the charge of funds
    * for the auction deposit from the buyer to COS (only relevant for cross border transactions for now).
    * This deposit is refunded by COS once the buyer provides the necessary documentation for a cross border transaction.
    */
    thirdPartyVATDepositChargeReference:	string
   
   /*  
   * This is a reference (e.g. primary key) to a resource in an external invoicing service (such as Stripe).
   * If this is not null, it should reference an external resource, containing information about the charge of funds
   * for the auction additional tax (e.g country specific luxury tax) from the buyer to COS.
   */ 
    thirdPartyAdditionalTaxChargeReference:	string
    
    /*  
    * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the refund of a
    * additional tax deposit (only used for cross-border transactions currently).
    */
    thirdPartyAdditionalTaxRefundReference:	string
    
    /* 
    * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the payout of funds. 
    */
    thirdPartyPayoutReference:	string
    
    /* 
    * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the refund of a
    * deposit (only used for cross-border transactions currently). 
    */
    thirdPartyVATDepositRefundReference:	string
    
   /*  
   * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
   * If this is not null, it should reference an external resource, containing information about the refund of a
   * transfer to the deposit account owned by cos (only used for cross-border transactions currently). 
   */
    thirdPartyVATDepositReversalReference:	string
    
    /*  
    
    * Reference to the invoice for the success fee issued to the seller for a sold vehicle (see ESellerFeeInvoicingMode.INVOICE_ON_SUCCESS).
    * The reference identifies the invoice issued to the seller in an external invoicing system (e.g. Stripe).
    
    * This fee is not always charged, therefore this reference is optional (can be null).
    */
    sellerSuccessFeeInvoiceReference:	string
    
    /*    
    * Reference to the invoice for the listing fee issued to the seller for a listed vehicle (see ESellerFeeInvoicingMode.INVOICE_ON_LISTING).
    * The reference identifies the invoice issued to the seller in an external invoicing system (e.g. Stripe).
    
    * This fee is not always charged, therefore this reference is optional (can be null).  
    */
    sellerListingFeeInvoiceReference:	string
    
    /*
    * Reference to the invoice for the listing surcharge fee issued to the seller for a listed vehicle (see ESellerFeeInvoicingMode.SELLER_LISTING_SURCHARGE).
    * The reference identifies the invoice issued to the seller in an external invoicing system (e.g. Stripe).
    
    * This fee is not always charged, therefore this reference is optional (can be null).  
    */
    listingSurchargeFeeInvoiceReference:	string
    
    
    /*
    * Reference to a resource in an external invoicing system (such as Stripe).
    * References our own transaction fee invoice.  
    */
    invoiceReference:	string
    
    
    /*  
    * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
    * This is only non-null, if external payment is allowed for this auction.
    */
    thirdPartyInvoiceReference:	string
    
    
    /*  
    * This is a reference (e.g. primary key) to a resource in an external invoicing system (such as Stripe).
    * If this is not null, it should reference an external resource, containing information about the transfer of funds
    * for the auction volume: from COS to the seller.
    */
    thirdPartyTransferReference:	string 
    
}