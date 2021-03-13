type TagList = {
  icon: string;
  name: string;
}
type Tags = {
  title: string;
  icons: string[];
}
type RootState = {
  tags: Tags[];
  tagListOut: TagList[][];
  tagListIn: TagList[][];
  customTagsOut: TagList[];
  customTagsIn: TagList[];
  type: '-' | '+';
  addType: '-' | '+';
}
