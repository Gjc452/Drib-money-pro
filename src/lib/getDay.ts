const weekDay = [{day: 1, week: '星期一'}, {day: 2, week: '星期二'}, {day: 3, week: '星期三'}, {day: 4, week: '星期四'}, {
  day: 5,
  week: '星期五'
}, {day: 6, week: '星期六'}, {day: 0, week: '星期天'}];

function getDay(day: number) {
  return weekDay.filter(n => n.day === day)[0].week;
}

export default getDay;
