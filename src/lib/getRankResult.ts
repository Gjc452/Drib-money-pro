function getRankResult(list: RecordItem[]){
  if(list.length===0){return []}
  const result = [{
    tag: list[0].tag.icon,
    note: list[0].tag.name,
    total: 0,
    percent: '0%'
  }];
  for (let i = 1; i < list.length; i++) {
    if (result.map(r => r.tag).indexOf(list[i].tag.icon) < 0) {
      result.push({tag: list[i].tag.icon, note: list[i].tag.name, total: 0, percent: '0%'});
    }
  }
  result.map(group => group.total = list.filter(l => l.tag.icon === group.tag).reduce((sum, item) => sum + parseFloat(item.amount), 0));
  result.sort((a, b) => b.total - a.total);
  const amount = result.reduce((sum, item) => sum + item.total, 0);
  list.length !== 0 ? result.map(group => group.percent = (group.total / amount * 100).toFixed(2) + '%') : '';
  return result
}
export default getRankResult
