function idCreate() {
  let id = JSON.parse(window.localStorage.getItem('id') || '0');
  id += 1;
  window.localStorage.setItem('id', JSON.stringify(id));
  return id;
}

export default idCreate;
