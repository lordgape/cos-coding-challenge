import IVehicleTireDetails from "./IVehicleTireDetails";

export default interface IVehicleTireSet {
  /* Indicates if tires are installed. */
  isInstalled: boolean;

  /* The tire type. 
    
* Enum:
* Array [ 7 ]
    */
  type: number;

  /* The rim type of the wheels.

Enum:
Array [ 5 ] */
  rim: number;

  details: [IVehicleTireDetails];
  /* Radial size of tires set. */
  size: string;

  /* All the flaws for tires. */
  flawDescription: string;
}
