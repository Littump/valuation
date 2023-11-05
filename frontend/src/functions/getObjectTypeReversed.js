export default function getObjectTypeReversed(objectType) {
  let objectTypes = {
    1: "первичка",
    2: "вторичка",
  };
  return objectTypes[objectType];
}
