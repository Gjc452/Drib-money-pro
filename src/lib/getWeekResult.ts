import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);
function getWeekResult(result: number[],week: number,recordList: RecordItem[]) {
  const newList = (JSON.parse(JSON.stringify(recordList)) as RecordItem[]).filter(r => dayjs(r.createAt).week() === week)
  for (let i = 0; i < 7; i++) {
    let total = 0;
    for (let j = 0; j < newList.length; j++) {
      if (dayjs(newList[j].createAt).day() === i) {
        total += parseFloat(newList[j].amount);
      }
    }
    result.push(total);
  }
}

export default getWeekResult
