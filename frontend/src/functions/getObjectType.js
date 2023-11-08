export default function getObjectType(objectType) {
  let objectTypes = {
    первичка: 1,
    вторичка: 2,
  };
  return objectTypes[objectType];
}
