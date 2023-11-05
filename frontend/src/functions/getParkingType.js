export default function getParkingType(parkingType) {
  if (parkingType === "") return "none";
  let parkingTypes = {
    "наземная парковка": "grn",
    "многоуровневая парковка": "mlt",
    "подземная парковка": "und",
    "парковка на крыше": "orf",
    "нет парковки": "none",
  };
  return parkingTypes[parkingType];
}
