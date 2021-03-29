import dayjs from 'dayjs';

function getYearResult(result: number[],year: number,list: RecordItem[]){
  const newList = list.filter(r=>dayjs(r.createAt).year() === year)
  for(let i =0;i<12;i++){
    let total = 0
    for(let j=0;j<newList.length;j++){
      if(dayjs(newList[j].createAt).month()===i){
        total += parseFloat(newList[j].amount)
      }
    }
    result.push(total)
  }
}
export default getYearResult
