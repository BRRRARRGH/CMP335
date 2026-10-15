const url = 'http://localhost:3000/api/rocks'; //base URL
let rocks = []; //obj array

function getItems() { //function to get rocks from the server
  fetch(url)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() { //function to add a rock
  const item = {
    color: document.getElementById('Color').value,
    type: document.getElementById('Type').value,
    count: parseInt(document.getElementById('Number').value)
  }; //parameters for rock obj

  postUrl = `${url}?color=${item.color}&type=${item.type}&count=${item.count}`; //adjusts URL for query paramaters
  fetch(postUrl, { //fetches with post method and query parameters
    method: 'POST'
  })
    .then(response => response.json())
    .then(() => {
      getItems();//calls get items, then clears all elements in html
      document.getElementById('Color').value = '';
      document.getElementById('Type').value = '';
      document.getElementById('Number').value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) { //function to delete an item with id
    console.log(`Deleting item with ID: ${id}`);
  fetch(`${url}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function addNumber(id) //function to call put function to add a rock count to an existing rock
{
console.log(`Adding item with ID: ${id}`);
  fetch(`${url}/add/${id}`, {
    method: 'PUT'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to add item.', error));
}

function subtractNumber(id) //function to call put function to subtract a rock count to an existing rock
{
console.log(`Subtracting item with ID: ${id}`);
  fetch(`${url}/remove/${id}`, {
    method: 'PUT'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to subtract item.', error));
}

function _displayCount(itemCount) { //displays rock count in html
  const name = (itemCount === 1) ? 'rock type' : 'rock types';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) { //displays rock data in html
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