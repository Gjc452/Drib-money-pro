function findIndex(tags: TagList[], id: number) {
  let result = -1;
  for (let i = 0; i < tags.length; i++) {
    tags[i].id === id && (result = i);
  }
  return result;
}

export default findIndex;
