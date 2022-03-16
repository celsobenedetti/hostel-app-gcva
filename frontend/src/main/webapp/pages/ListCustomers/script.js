
getElementTableFormat = data =>
   (
    `
    <tr>
    <td class="table-index">${data.id}</td>

    <td>${data.phone}</td>
    <td>${data.first_name}</td>
    <td>${data.last_name}</td>
    <td>${data.email}</td>
    <td>
    <div class="status-container">
        <input type="checkbox" id="status" value="" check="${data.status || false}"/>
        <div class="status-fake-button">
          <div class="status-fake-button-mark">

          </div>
        </div>
      </div>
    </td>
  </tr>
  `
)



function showListCustomers(data) {
  var table = document.querySelector('#customers > tbody')
  table.innerHTML = '';
  data.forEach((item, i) => {
    table.innerHTML += getElementTableFormat(item)
  });

}

function showTotalCustomers(n) {
  var totalCustomers = document.querySelector('#total-customers-value')
  totalCustomers.innerText = n
}

async function init(){
  // dados que vão vir de uma requisição
  // var {data: customers} = await axios.get("http://localhost:3001/customers")
  var customers = [
      {
        "id": 1,
        "first_name": "André",
        "last_name":  "Neves",
        "email": "email@email",
        "phone": "(99) 999999999",
        "address": "R. Desconhecida, 00, Centro",
        "country": "Brazil",
        "state": "MG"
      },
      {
        "id": 2,
        "first_name": "Arthur",
        "last_name":  "Klimas",
        "email": "email@email",
        "phone": "(99) 999999999",
        "address": "R. Desconhecida, 00, Centro",
        "country": "Brazil",
        "state": "MG"
      },
      {
        "id": 3,
        "first_name": "Caio",
        "last_name":  "Marcondes",
        "email": "email@email",
        "phone": "(99) 999999999",
        "address": "R. Desconhecida, 00, Centro",
        "country": "Brazil",
        "state": "MG"
      },
      {
        "id": 4,
        "first_name": "Celso",
        "last_name":  "Patiri",
        "email": "email@email",
        "phone": "(99) 999999999",
        "address": "R. Desconhecida, 00, Centro",
        "country": "Brazil",
        "state": "MG"
      }
    ]
  showListCustomers(customers)
  showTotalCustomers(customers.length)
}
