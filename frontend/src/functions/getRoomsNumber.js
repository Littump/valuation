export default function getRoomsNumber(roomsNumber) {
  let roomsNumberTypes = {
    студия: 0.7,
    "1-комнатная": 1,
    "2-комнатная": 2,
    "3-комнатная": 3,
    "4-комнатная": 4,
    "5-комнатная": 5,
    "6-комнатная": 6,
  };
  return roomsNumberTypes[roomsNumber];
}
