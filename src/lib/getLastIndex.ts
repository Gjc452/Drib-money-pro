function getLastIndex(re: RegExp, value: string) {
  const result = [];
  let n;
  let index = -10;
  while ((n = re.exec(value)) !== null) {
    result.push(n);
  }
  if (result.length !== 0) {
    index = result[result.length - 1].index;
  }
  return index;
}

export default getLastIndex;
