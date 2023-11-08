export default function getObjectType(objectType) {
  let objectTypes = {
    Первичка: 1,
    Вторичка: 2,
  };
  return objectTypes[objectType];
}
