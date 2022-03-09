export default interface IVehicleDamage {
    /* Indicating where on the vehicle the damage/flaw is located.
     * Enum:
     * Array [ 46 ]
     */
    location: number;
  
    types: Array<Number>;
    /* A textual description of the damage, provided by the
  seller (optional). */
    description: String;
  
    /* URL to an optional image showing the vehicle damage. */
    urlToImage: String;
  
    /* The vehicle that is associated with the given damage. */
    _fk_uuid_vehicle: String;
  
    /* Timestamp when the object was removed. */
    deletedAt?: String; // ($date-time)
  
    id: number; // ($double)
    uuid: String;
  }
  