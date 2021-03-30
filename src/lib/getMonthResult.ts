import dayjs from 'dayjs';

function getMonthResult(result: [{}],month: number,days: number,selectedList: RecordItem[]){
  const newList = (JSON.parse(JSON.stringify(selectedList)) as RecordItem[]).filter(r =>dayjs(r.createAt).month()===month)
  for(let i = 1;i<=days;i++){
    let total = 0
    for(let j=0;j<newList.length;j++){
      if(dayjs(newList[j].createAt).date()===i){
        total += parseFloat(newList[j].amount)
      }
    }
    result.push({total,time:i})
  }
}
export default getMonthResult
