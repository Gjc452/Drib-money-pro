import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek)
function getWeekResult(result: number[],week: number,recordList: RecordItem[]) {
  const newList = (JSON.parse(JSON.stringify(recordList)) as RecordItem[]).filter(r => dayjs(r.createAt).isoWeek() === week)
  for (let i = 1; i <= 7; i++) {
    let total = 0;
    for (let j = 0; j < newList.length; j++) {
      if (dayjs(newList[j].createAt).isoWeekday() === i) {
        total += parseFloat(newList[j].amount);
      }
    }
    result.push(total);
  }
}

export default getWeekResult
