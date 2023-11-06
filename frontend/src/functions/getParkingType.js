export default function getParkingType(parkingType) {
  if (parkingType === "") return "0";
  let parkingTypes = {
    "наземная парковка": "grn",
    "многоуровневая парковка": "mlt",
    "подземная парковка": "und",
    "парковка на крыше": "orf",
    "нет парковки": "0",
  };
  return parkingTypes[parkingType];
}
