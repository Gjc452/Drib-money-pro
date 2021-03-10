function addBits(value: string) {
  let total = 0;
  const str = value.match(/[+-]*(\.\d+|\d+(\.\d+)?)/g) || [];
  while (str.length) {
    total += parseFloat(str.shift() as string);
  }
  return total.toString();
}

export default addBits;
