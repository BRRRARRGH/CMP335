const url = 'http://localhost:3000/api/rocks';
let rocks = [];

function getItems() {
  fetch(url)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const item = {
    color: document.getElementById('Color').value,
    type: document.getElementById('Type').value,
    count: parseInt(document.getElementById('Number').value)
  };

  postUrl = `${url}?color=${item.color}&type=${item.type}&count=${item.count}`;
  fetch(postUrl, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      document.getElementById('Color').value = '';
      document.getElementById('Type').value = '';
      document.getElementById('Number').value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    console.log(`Deleting item with ID: ${id}`);
  fetch(`${url}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function updateItem() {
  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${url}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function addNumber(id) 
{
console.log(`Adding item with ID: ${id}`);
  fetch(`${url}/add/${id}`, {
    method: 'PUT'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to add item.', error));
}

function subtractNumber(id)
{
console.log(`Subtracting item with ID: ${id}`);
  fetch(`${url}/remove/${id}`, {
    method: 'PUT'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to subtract item.', error));
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'rock type' : 'rock types';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    console.log('Displaying items:', data);
  const tBody = document.getElementById('rockbody');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let addButton = button.cloneNode(false);
    addButton.innerText = '+';
    addButton.setAttribute('onclick', `addNumber(${item.id})`);

    let subtractButton = button.cloneNode(false);
    subtractButton.innerText = '-';
    subtractButton.setAttribute('onclick', `subtractNumber(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    let colorNode = document.createTextNode(item.color);
    td1.appendChild(colorNode);

    let td2 = tr.insertCell(1);
    let typeNode = document.createTextNode(item.type);
    td2.appendChild(typeNode);

    let td3 = tr.insertCell(2);
    let countNode = document.createTextNode(item.count);
    td3.appendChild(countNode);

    let td4 = tr.insertCell(3);
    td4.appendChild(addButton);

    let td5 = tr.insertCell(4);
    td5.appendChild(subtractButton);

    let td6 = tr.insertCell(5);
    td6.appendChild(deleteButton);
  });

  rocks = data;
}