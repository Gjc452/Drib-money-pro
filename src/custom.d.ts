type Tag = {
  icon: string;
  name: string;
  custom?: boolean;
}
type Tags = {
  title: string;
  icons: string[];
}

type RecordItem = {
  id: number;
  tag: Tag;
  notes: string;
  type: string;
  amount: string;
  createAt: string;
}
type RootState = {
  tags: Tags[];
  tagListOut: Tag[][];
  tagListIn: Tag[][];
  record: RecordItem;
  recordList: RecordItem[];
  type: '-' | '+';
  addType: '-' | '+';
}
