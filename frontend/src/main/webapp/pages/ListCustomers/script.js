
getElementTableFormat = data =>
   (
    `
    <tr>
    <td class="table-index">${data.id}</td>

    <td>${data.phone}</td>
    <td>${data.firstName}</td>
    <td>${data.lastName}</td>
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

const createButtonPag = (content) => {
  const button = document.createElement('button')
  button.setAttribute('class', 'button-pag'); //possivel erro
  button.innerHTML = content;
  button.onclick = () => handleSwapPage(content);
  return button
}


function blockButtonsPagination(direction, block) {
  var left = document.querySelector('#button-left').style
  var right = document.querySelector('#button-right').style

  var style = {
    opacity: block ? "0.8" : "1",
    cursor:  block ? "no-drop" : "pointer"
  }
  switch (direction) {
    case "left":
      left.cursor = style.cursor
      left.opacity = style.opacity

      break;
    case "right":

      right.cursor = style.cursor
      right.opacity = style.opacity

      break;
    case "all":
      right.cursor = style.cursor
      right.opacity = style.opacity
      left.cursor = style.cursor
      left.opacity = style.opacity
      break;
    default:

  }
}
function defineButtonsPagination(nPages) {
  var containerPagination = document.querySelector('#pagination-buttons > .container-button-pag')
  containerPagination.innerHTML = ''
  if (nPages <= 1) {
    blockButtonsPagination("all", true)
    return;
  }
  for (let i = 1; i <= nPages; i++){
    if (i <= 5)
      containerPagination.appendChild(createButtonPag(i))
    else {
      containerPagination.innerHTML += `
      <div class="pag-more">
        <div></div>
        <div></div>
        <div></div>
      </div>`
      break;
    }
  }

}

class Page {
  constructor() {
    this.pageSize = 10
    this.pageNumber = 1
    this.totalPages = 0
    this.link = "http://localhost:8080/backend/api/guests/page?"
  }

  requestPage = async () => {
    var {data: page} = await axios.get(`${this.link}page=${this.pageNumber}&size=${this.pageSize}`)
    return page
  }

  async showPage() {
    var {result: customers, totalSize} = await this.requestPage()
    this.totalPages = Math.ceil(totalSize / this.pageSize)
    showListCustomers(customers)
    showTotalCustomers(totalSize)
    defineButtonsPagination(this.totalPages)

  }

  async setPage(pageNumber) {
    this.pageSize = parseInt(document.getElementById("page-size").value)
    this.pageNumber = pageNumber
    await page.showPage()
  }

}

const page = new Page()

async function handleSwapPage(pageNumber) {
  if (pageNumber <= 0 ) {
    pageNumber = 0
    blockButtonsPagination("left", true)
    return;
  }
  if (pageNumber > page.totalPages)  {
    pageNumber = page.totalPages
    blockButtonsPagination("right", true)
    return;
  }
  blockButtonsPagination("all", false)
  await page.setPage(pageNumber)

}

async function init(){
  page.setPage(1)

  //await requestPageCustomers()
}
