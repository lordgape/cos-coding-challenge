export default interface IVehiclePaintState {
    /* Vehicle part.
     * Enum:
     * Array [ 13 ]
     */
    part: number;
  
    /* The paint thickness in microns. */
    value: number; // ($double)
  
    /* Timestamp when entry was created. */
    createdAt?: string; // ($date-time)
  }
  