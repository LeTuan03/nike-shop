function createRandomId(prefix = "") {
  const randomChar = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  const randomId =
    prefix +
    Date.now().toString(36) +
    Array.from({ length: 5 }, randomChar).join("");

  const isUnique = (id) => {
    // Check if the ID is unique (e.g. not already in use in a database)
    return true;
  };

  const generateId = () => {
    if (isUnique(randomId)) {
      return randomId;
    } else {
      return createRandomId(prefix);
    }
  };
  let txt = generateId();
  return txt;
}
export default createRandomId;
