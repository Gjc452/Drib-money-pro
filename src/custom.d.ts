type TagList = {
  id: number;
  icon: string;
  name: string;
}
type RootState = {
  tagListOut: TagList[];
  tagListIn: TagList[];
  otherTagListOut: TagList[];
  otherTagListIn: TagList[];
}
