import IFieldConfirmationStatus from "./IFieldConfirmationStatus";

export default interface IVehicleFieldConfirmationStatusMap {
  euroNorm?: IFieldConfirmationStatus;
  numSeats?: IFieldConfirmationStatus;
  category?: IFieldConfirmationStatus;
  ac?: IFieldConfirmationStatus;
  coupling?: IFieldConfirmationStatus;
  navigation?: IFieldConfirmationStatus;
  parkingAssistance?: IFieldConfirmationStatus;
  headlights?: IFieldConfirmationStatus;
  sunRoof?: IFieldConfirmationStatus;
  vehicleHeater?: IFieldConfirmationStatus;
  sportPackage?: IFieldConfirmationStatus;
}
