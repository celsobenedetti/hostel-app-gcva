
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


async function init(){
  // dados que vão vir de uma requisição
  var {data: customers} = await axios.get("http://localhost:3001/customers")
  showListCustomers(customers)
}
