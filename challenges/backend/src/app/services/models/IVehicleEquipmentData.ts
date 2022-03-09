export default interface IVehicleEquipmentData {
    /* the NOT unique identifier from the external source (DAT). */
    externalId: string;
  
    /* the equipment group (DAT). */
    externalGroup: string;
  
    /* Equipment's raw description from external source (DAT) */
    description: string;
  
    /* equipment type, can be series or special.
  
  Enum:
  Array [ 2 ] */
    type: number;
  
    uuid: string;
  }
  