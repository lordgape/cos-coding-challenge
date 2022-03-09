export default interface IVehicleEquipmentHighlightData {
    /* the unique identifier from the external source (DAT). */
    externalId: string;
  
    /* Internal ranking score (the lower the better).
      Based on that it would be possible to highlight the most important equipment */
    rank: number; // ($double)
  
    /* Equipment's raw description from external source (DAT) */
    description: string;
  
    /* Equipment's category
     * Enum:
     * Array [ 8 ] */
    category: number;
  
    uuid: string;
  }
  