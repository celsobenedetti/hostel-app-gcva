//Formata as linhas que serão exebidas na tabela, retornando o HTML dessas linhas
const request = axios.create({"baseURL": "http://localhost:8080/backend/api/guests"})

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


//Insere cada linha na tabela, cada elemento do array data vira uma linha
function showListCustomers(data) {
  var table = document.querySelector('#customers > tbody')
  var noResults = document.querySelector('#no-result')
  table.innerHTML = '';
  if (!data.length) {
    noResults.style.display = "flex";
  } else {
    noResults.style.display = "none";
    data.forEach((item, i) => {
      table.innerHTML += getElementTableFormat(item)
    });
  }

}

//Exibi o numero total de hospedes que existe no banco de dados
function showTotalCustomers(n) {
  var totalCustomers = document.querySelector('#total-customers-value')
  totalCustomers.innerText = n
}

//Cria um botão numerico que indica uma pagina a ser selecionada (apenas cria, mas não é renderizado na pagina)
const createButtonPag = (content) => {
  const button = document.createElement('button');
  button.setAttribute('class', 'button-pag');
  button.innerHTML = content;
  button.onclick = () => handleSwapPage(content);
  return button
}

//bloqueia e desbloqueia os buttons de paginação left e right
function blockButtonsPagination(direction, block) {
  var left = document.querySelector('#button-left').style
  var right = document.querySelector('#button-right').style

  var style = {
      backgroundColor: block ? "#CACACA" : "#0047FF",
      cursor:  block ? "no-drop" : "pointer"
    }


  switch (direction) {
    case "left":
      Object.assign(left, style)
      break;
    case "right":
      Object.assign(right, style)
      break;
    case "all":
      Object.assign(left, style)
      Object.assign(right, style)
      break;
    default:

  }
}

//Renderiza os buttons na pagina e trata particularidades
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

//Controla a exibição do page-onload
function controlPageLoad(control) {
  var load = document.getElementById('page-load').style
  load.display = !control ? "none" : "block";
}

//Classe que representa uma pagina
class Page {
  constructor() {
    this.pageSize = 0
    this.searchString = undefined
    this.pageNumber = 0
    this.totalPages = 0
  }

  requestPage = async () => {
    var stringRequest =
    this.searchString ?
    `search?q=${this.searchString}&page=${this.pageNumber}&size=${this.pageSize}`
    :
    `?page=${this.pageNumber}&size=${this.pageSize}`
    console.log(stringRequest)
    var {data: page} = await request.get(stringRequest)
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
    this.searchString = document.getElementById("page-search").value
    this.pageNumber = pageNumber
    controlPageLoad(true)
    await page.showPage()
    controlPageLoad(false)
  }

}

const page = new Page() //Inicia a area de paginas

//funcao que estará em todos os listeners html (onclick, onchange, ...) referentes a troca de página
async function handleSwapPage(pageNumber) {
  if (pageNumber <= 0 ) {
    pageNumber = 0
    blockButtonsPagination("left", true)
    return;
  }
  if (page.totalPages && pageNumber > page.totalPages) //Se o numero total de paginas não for zero e pageNumber maior que o total de paginas, bloqueie
  {
    pageNumber = page.totalPages
    blockButtonsPagination("right", true)
    return;
  }
  blockButtonsPagination("all", false)
  await page.setPage(pageNumber)

}

async function init(){
  page.setPage(1) //Inicia a página 1
}
