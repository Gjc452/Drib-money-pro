function findIndex(tags: TagList[], icon: string) {
  let result = -1;
  for (let i = 0; i < tags.length; i++) {
    tags[i].icon === icon && (result = i);
  }
  return result;
}

export default findIndex;
