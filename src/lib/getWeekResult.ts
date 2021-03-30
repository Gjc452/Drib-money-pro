import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek)
function getWeekResult(result: [{}],year: number,week: number,recordList: RecordItem[]) {
  const newList = (JSON.parse(JSON.stringify(recordList)) as RecordItem[]).filter(r=>dayjs(r.createAt).year()===year).filter(r => dayjs(r.createAt).isoWeek() === week)
  let time
  if(year === dayjs().year()){
    time = dayjs(`${year}`).week(week+1)
  }else {
    time = dayjs(`${year}`).week(week)
  }
  while (time.day()!==0){
    time = time.subtract(1,'day')
  }
  for (let i = 1; i <= 7; i++) {
    time = time.add(1,'day')
    const day = time.format('MM-DD')
    let total = 0;
    for (let j = 0; j < newList.length; j++) {
      if (dayjs(newList[j].createAt).isoWeekday() === i) {
        total += parseFloat(newList[j].amount);
      }
    }
    result.push({total,time:day.toString()});
  }
}

export default getWeekResult
