type TagList = {
  icon: string;
  name: string;
  custom?: boolean;
}
type Tags = {
  title: string;
  icons: string[];
}
type RootState = {
  tags: Tags[];
  tagListOut: TagList[][];
  tagListIn: TagList[][];
  type: '-' | '+';
  addType: '-' | '+';
}
