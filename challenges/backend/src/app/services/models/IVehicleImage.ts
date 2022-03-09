

export default interface IVehicleImage {
    perspective:	number // ($double)
_fk_uuid_vehicle:	String
mimeType:	String
encoding:	String
rawData:	Object
url:	String

/* Indicating the time when the entity has been created, i.e. when the entity was
persisted to the database. */
createdAt?:	String // ($date-time)

/* Indicating the last time a value of the entity has been changed (updated). */
updatedAt?:	String // ($date-time)

/* Indicating the time when the entity has been (softly) deleted.
"null" if entry is not deleted. */
deletedAt?:	String // ($date-time)


uuid:	String
}