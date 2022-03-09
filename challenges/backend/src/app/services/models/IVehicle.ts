import IVehicleDamage from "./IVehicleDamage";
import IVehicleImage from "./IVehicleImage";
import IFile from "./IFile";
import IVehiclePaintState from "./IVehiclePaintState";
import IVehicleTireSet from "./IVehicleTireSet";
import IVehicleTechState from "./IVehicleTechState";
import IVehicleFieldConfirmationStatusMap from "./IVehicleFieldConfirmationStatusMap";
import IVehicleEquipmentData from "./IVehicleEquipmentData";
import IVehicleEquipmentHighlightData from "./IVehicleEquipmentHighlightData";

export default interface IVehicle {
  /* The globally unique Vehicle Identification number (given out by the OEMs) */
  vin: string;

  /* Make of the vehicle, such as "Ford" or "Mercedes-Benz" */
  make: string;

  makeInternalDatReference: string;

  /* Model description of a vehicle. */
  model: string;

  modelInternalDatReference: string;
  /* Normalized string indicating the base model of the vehicle.
This can be used to compare vehicles, in order to find vehicles that have
the same base model. */
  datBaseModelRaw: string;

  /* Date of first registration in the format "MM/YYYY". */
  ez: string;

  /* Mileage of the vehicle. */
  mileageInKm: number; //($double)

  /*
   * Vehicle characteristics
   * Enum:
   * Array [ 10 ]
   */
  category: number;

  /*
   * Enum:
   * Array [ 3 ]
   */
  transmission: number;

  /*
   * Enum:
   * Array [ 5 ]
   */
  upholstery: number;

  numSeats: number; // ($double)

  /*
   * Enum:
   * Array [ 9 ]
   */
  fuelType: number;

  /*
   * Enum:
   * Array [ 4 ]
   */
  doors: number;

  engineSizeInCcm: number; // ($double)
  enginePowerInHp: number; // ($double)

  /*
   * The current paint color of the vehicle.
   * Enum:
   * Array [ 13 ]
   */
  bodyColorCode: number;

  /* Physical dimensions of the vehicle. */
  dimensionWidthInCm: number; // ($double)

  dimensionHeightInCm: number; //($double)
  dimensionLengthInCm: number; // ($double)
  unloadedWeightInKg: number; // ($double)

  /* Date of the next (=> IMPORTANT, not "last") "Hauptuntersuchung" (Main Inspection) of the vehicle in the form
"MM/YYYY". Can be null. */
  lastHu: string;

  /* Flag indicating whether the report for the last "Hauptuntersuchung" is available. */
  huReportExists: boolean;

  /* number of previous owners of the vehicle. */
  numPreOwners: number; // ($double)

  /* number of keys available for the vehicle. */
  numKeys: number; // ($double)

  /* Whether the "Value Added Tax is reportable", a special tax condition in the EU.
If this is true, it means that the vehicle is "Regelbesteuert", meaning that the invoice for the vehicle
(either invoiced directly from seller to buyer - or from COS Payment to buyer) needs to include
the VAT (in Germany e.g. 19%) in the invoice.

If this is false, the invoice does not need to have explicit VAT. */
  vatIdReportable: boolean;

  /* Shows how exactly the car was inspected during the service check.
   * Enum:
   * Array [ 7 ]
   */
  fullServiceHistoryType: number;

  /* Indicating whether the paperwork or digital version is available to proof that the vehicle has a full service history.
   * Enum:
   * Array [ 4 ]
   */
  serviceHistoryAvailability: number;

  /* Indicating if the vehicle has maintenance book or not. */
  hasMaintenanceBook: boolean;

  /* Indicating whether the vehicle is reimported from another country. */
  isReimportedVehicle: boolean;

  /* The EURO Norm, a standard for vehicle emissions in the EU. */
  euroNorm: string;

  /* Whether the vehicle had one or several previous damages (before "Vorschäden", now "behobener Schaden") */
  hadAccident: boolean;

  /* Textual description of the accident previous damages (before "Vorschäden", now "behobener Schaden"). */
  accidentDescription: string;

  /* Whether the vehicle had one or several actual damages ("bestehender Unfallschaden") */
  hasDamages: boolean;

  /* Textual description of the accident actual damages ("bestehender Unfallschaden"). */
  damagesDescription: string;

  /* Damages registered for the vehicle.

This field is augmented and not stored in the same table as the vehicle itself. */
  damages: [IVehicleDamage];

  /* Textual description of damages (Mängel). */
  additionalDamages: string;

  /* Additional useful information about the vehicle. */
  additionalInfo: string;

  /*
   * Indicates whether the vehicle is ready to drive.
   * Enum:
   * Array [ 3 ]
   */
  readyToDrive: number;

  /* Detailed information about readiness to drive.
Should be filled only when NO or CONDITIONALLY is chosen. */
  readyToDriveDetails: string;

  /* Array containing all images of a vehicle.
This structure is dynamically augmented on retrieving the vehicle object.

"vehicleImages" replaces the deprecated "imageUrls" data structure.

For every vehicle, there is at lease one image. */
  vehicleImage: [IVehicleImage];

  /* All the attachments binary data is delivered via this property.
For reading URLs, urlToAttachment{1,2,3} should be used.

When uploading attachments will be changed to doing that from the frontend directly
and storing URLs to uploaded docs, this property can be removed. */
  attachments: [IFile];

  /* URLs to attachment files.
"null" if no attachment has been uploaded. */
  urlToAttachment1: string;

  urlToAttachment2: string;
  urlToAttachment3: string;

  /* URL to the vehicle summary sheet, a PDF document summing up the most important
info of the vehicle. */
  urlToVehicleSummarySheet: string;

  /* The estimated value in EUR for the given vehicle.
This value is calculated via third-party systems.

If no value can be determined, this value is null. */
  estimatedValue: number; // ($double)

  /* Date of the last service inspection.

This value is only available since June 2020. */
  lastServiceInspectionDate: string;

  /* Odometer mileage of the last service inspection.

This value is only available since June 2020. */
  lastServiceInspectionMileage: number; // ($double)

  /* Flag indicating whether COC document is available for the vehicle.

This value is only available since June 2020. */
  isCocDocumentAvailable: boolean;

  /* Country in which the vehicle was previously registered.
   *
   * This value is only available since June 2020. *
   *
   * Enum:
   * Array [ 32 ]
   */
  countryOfLastRegistration: string;

  /* How was the vehicle created?
Manually or from a report? If yes, which report type?

Enum:
Array [ 14 ] */
  origin: number;

  /* Where does the vehicle data come from?
DAT? Schwacke? Manually entered?

Enum:
Array [ 3 ] */
  dataSource: number;

  /* Information about paint state per vehicle part (in micrometers). */
  paintState: [IVehiclePaintState];

  /* Information about tires. */
  tires: [IVehicleTireSet];
  /* Contain all the information about data inaccuracy (e.g. fetched many results from 3rd-party systems).

number
Enum:
Array [ 3 ] */
  dataWarnings: [];

  /* The reference to the vehicle inspection from another data source. */
  inspectionUuid: string;

  /* Info about vehicle technical state. */
  technicalState: [IVehicleTechState];

  fieldsConfirmationStatus: IVehicleFieldConfirmationStatusMap;

  /* A vehicle registration plate. Important for NL vehicles as it's connected to the specific vehicle. */
  licensePlate: string;

  id: number; // ($double)

  /* The Air Conditioning in the vehicle.
   * Enum:
   * [ 0, 1, 1, 2 ]
   */
  ac: number;

  /* The navigation system available in the vehicle. */
  navigation: number; // ($double)

  /* The headlights available for.
   * Enum:
   * [ 0, 1, 1, 2, 3 ]
   */
  headlights: number;

  /* 
The coupling available on the vehicle. 
Enum:
[ 0, 1, 1, 2 ]
*/
  coupling: number;

  /* Vehicle heater ("Standheizung") available in the vehicle.
   * Enum:
   * [ 0, 1, 1, 2 ]
   */
  vehicleHeater: number;

  /* Parking assistance system available in the vehicle.
   * Enum:
   * [ 0, 1, 1, 2, 3 ]
   */
  parkingAssistance: number;

  /* Sunroof available in the vehicle. */
  sunRoof: number; // ($double)

  /* Whether the vehicle has a sport package. */
  sportPackage: number; // ($double)

  /* Detailed information about vehicle equipment.
Includes seriesEquipments and specialEquipments. */
  equipmentData: [IVehicleEquipmentData];

  /* Equipment parts which should be highlighted. Not more than 9 items in total.
Display a special equipment items first, after that pick up from seriesEquipments,
but not more than 3 per category. */
  equipmentHighlights: [IVehicleEquipmentHighlightData];

  /* Indicating the time when the entity has been created, i.e. when the entity was
persisted to the database. */
  createdAt?: string; // ($date-time)

  /* Indicating the last time a value of the entity has been changed (updated). */
  updatedAt?: string; // ($date-time)

  /* Indicating the time when the entity has been (softly) deleted.
"null" if entry is not deleted. */
  deletedAt?: string; // ($date-time)

  uuid: string;
}
