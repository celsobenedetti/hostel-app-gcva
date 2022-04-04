const request = axios.create({ baseURL: "http://localhost:8080/backend/api/guests" })
Auth.validate(request)

// centraliza o acesso a elementos html
const htmlElements = () => ({
  select: document.getElementById("page-size"),
  searchInput: document.getElementById("page-search"),
  table: {
    body: document.querySelector('#customers > tbody'),
    headers: document.querySelectorAll("#customers > thead > tr > th"),
  },
  totalCustomers: document.querySelector('#total-customers-value'),
  buttonsPagination: {
    root: document.querySelector('#pagination-buttons > .container-button-pag'),
    numericButtonsContainer: document.querySelector('#pagination-buttons > .container-button-pag'),
    rightButton: document.querySelector('#button-right'),
    leftButton: document.querySelector('#button-left')
  },
  load: document.getElementById('page-load'),
  noResults: document.querySelector('#no-result')
})

//Adiciona a opcao de exibir todos os dados da tabela de uma vez, sem paginação
function addShowAllOptionInSelect(totalSize) {
  let { select } = htmlElements()
  let optionAll = document.createElement("option");
  optionAll.setAttribute("value", totalSize);
  optionAll.innerHTML = "all";

  select.appendChild(optionAll)
}

//Formata as linhas que serão exebidas na tabela, retornando o HTML dessas linhas
getElementTableFormat = element => (
  `
    <tr>
      <td class="table-index">${element.id}</td>
      <td>${element.phone}</td>
      <td>${element.firstName}</td>
      <td>${element.lastName}</td>
      <td>${element.email}</td>
      <td>
      <div class="status-container">
          <input type="checkbox" class="status" id=${element.id} onclick="handleUpdateStatus(${element.id}, this.checked)" ${element.status && 'checked'} />
          <div class="status-fake-button">
            <div class="status-fake-button-mark">

            </div>
          </div>
        </div>
      </td>
    </tr>
    `
)


//Insere cada linha na tabela, cada elemento do array `data` vira uma linha
function showListCustomers(customers) {
  let { table, noResults } = htmlElements()
  table.body.innerHTML = '';
  if (!customers.length) {
    noResults.style.display = "flex";
  } else {
    noResults.style.display = "none";
    customers.forEach(customer => {
      table.body.innerHTML += getElementTableFormat(customer)
    });
  }

}

//Exibi o numero total de hospedes que existe no banco de dados
function showTotalCustomers(total) {
  let { totalCustomers } = htmlElements()
  totalCustomers.innerText = total
}

//Cria um botão numerico que indica uma pagina a ser selecionada (apenas cria, mas não é renderizado na pagina)
const createButtonPag = content => {
  const button = document.createElement('button');
  button.setAttribute('class', 'button-pag');
  button.innerHTML = content;
  button.onclick = () => handleSwapPage(content);
  return button
}

//bloqueia e desbloqueia os botões de paginação left e right
function blockButtonsPagination(direction, block) {
  let { leftButton: left, rightButton: right } = htmlElements().buttonsPagination

  let style = {
    backgroundColor: block ? "#CACACA" : "#0047FF",
    cursor: block ? "no-drop" : "pointer"
  }


  switch (direction) {
    case "left":
      Object.assign(left.style, style)
      break;
    case "right":
      Object.assign(right.style, style)
      break;
    case "all":
      Object.assign(left.style, style)
      Object.assign(right.style, style)
      break;
    default:

  }
}

//Renderiza os buttons na pagina e trata particularidades
function defineButtonsPagination(nPages, pageSelect) {
  let { numericButtonsContainer: containerPagination } = htmlElements().buttonsPagination
  containerPagination.innerHTML = ''
  if (nPages <= 1) {
    blockButtonsPagination("all", true)
    return;
  }
  for (let i = 1; i <= nPages; i++) {
    if (i <= 5) {
      let button = createButtonPag(i)
      if (i == pageSelect) button.setAttribute('id', 'selected-page')
      containerPagination.appendChild(button)
    }
    // quando houverem mais de 5 paginas, o trecho abaixo carrega um "..." estilizado ao invés de carregar todos os botões de página
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

//Controla a exibição do load ao realizar buscas no backend
function controlPageLoad(control) {
  let { load } = htmlElements()
  load.style.display = !control ? "none" : "block";
}

//Funções atribuida ao listener onclick dos alteradores de status no html
async function handleUpdateStatus(id, status) {
  controlPageLoad(true)
  await request.get(`updateStatus?id=${id}&status=${status}`)
  controlPageLoad(false)
}

//Funções atribuida ao listener onclick do botão de limpar pesquisa
function handleCleanSearch() {
  let { searchInput } = htmlElements()
  searchInput.value = ''
  handleSwapPage(1);

}


class Pagination {
  constructor(htmlElements) {
    this.pageSize = 0
    this.searchString = undefined
    this.pageNumber = 0
    this.totalPages = 0
    this.htmlElements = htmlElements
  }

  //faz requisição na pagina
  requestPage = async () => {
    let stringRequest =
      this.searchString ?
        `search?q=${this.searchString}&page=${this.pageNumber}&size=${this.pageSize}`
        :
        `?page=${this.pageNumber}&size=${this.pageSize}`
    console.log(stringRequest)
    let { data: page } = await request.get(stringRequest)
    this.elements = page.result
    return page
  }

  async showPage() {
    let { result: customers, totalSize } = await this.requestPage()
    this.totalPages = Math.ceil(totalSize / this.pageSize)
    showListCustomers(customers)
    showTotalCustomers(totalSize)
    defineButtonsPagination(this.totalPages, this.pageNumber)

  }


  async constructPage(pageNumber) {
    let { select, searchInput } = this.htmlElements()
    this.pageSize = parseInt(select.value)
    this.searchString = searchInput.value
    this.pageNumber = pageNumber
    controlPageLoad(true)
    await this.showPage()
    controlPageLoad(false)
  }

}


//funcao que estará em todos os listeners html (onclick, onchange, ...) referentes a troca de página
async function handleSwapPage(pageNumber) {
  if (pageNumber <= 0) {
    pageNumber = 0
    blockButtonsPagination("left", true)
    return;
  }
  if (this.page.totalPages && pageNumber > this.page.totalPages) //Se o numero total de paginas não for zero e pageNumber maior que o total de paginas, bloqueie
  {
    pageNumber = this.page.totalPages
    blockButtonsPagination("right", true)
    return;
  }
  blockButtonsPagination("all", false)
  await this.page.constructPage(pageNumber)

}


//Classe responsável por tudo que é referente a ordenação da página pelos campos
class SortPage {
  constructor(page, htmlElements) {
    this.page = page
    this.htmlElements = htmlElements
  }
  getContentButton(ord) {
    let contentDiv = `<img width="10" src="./../../assets/chevron-up.svg">`
    let contentButton = {
      "asc": `
        <div style="opacity: 1;"> ${contentDiv} </div>
        <div style="opacity: 0;"> ${contentDiv} </div>
      `,
      "desc": `
        <div style="opacity: 0;""> ${contentDiv} </div>
        <div style="opacity: 1;""> ${contentDiv}</div>
      `,
      "none": `
        <div style="opacity: 1;"> ${contentDiv} </div>
        <div style="opacity: 1;"> ${contentDiv} </div>
      `
    }
    return contentButton[ord];
  }

  sortTableByColumn(button, field, ord) {
    //verifica se o parametro field é válido
    if (!Object.keys(this.page.elements[0]).includes(field)) {
      console.log("O campo a ser filtrado não existe");
      return;
    }

    let elements = [
      ...this.page.elements
    ]

    function compareFields(a, b, field) {
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }

    switch (ord) {
      case "none":
        button.onclick = () => this.sortTableByColumn(button, field, "asc")
        showListCustomers(this.page.elements)
        break;
      case "asc":
        button.onclick = () => this.sortTableByColumn(button, field, "desc")
        showListCustomers(elements.sort((a, b) => compareFields(a, b, field)))
        break;
      case "desc":
        button.onclick = () => this.sortTableByColumn(button, field, "none")
        showListCustomers(elements.sort((a, b) => compareFields(b, a, field)))
        break;
      default:
    }

    button.innerHTML = this.getContentButton(ord)
  }


  createButtonFilter(id, field) {
    const button = document.createElement('button');
    button.setAttribute('class', 'sort-button');


    button.innerHTML = button.innerHTML = this.getContentButton("none");
    button.onclick = () => this.sortTableByColumn(button, field, "asc");
    return button
  }

  addFilterButtonsInFields() {
    let fields = ["id", "phone", "firstName", "lastName", "email"]
    const { headers: tableHeaders } = htmlElements().table
    let table = document.querySelectorAll("#customers > thead > tr > th")
    for (let i = 0; i < fields.length; i++) {
      tableHeaders[i].querySelector(".contentHeader").appendChild(this.createButtonFilter("sort-button-customers" + i, fields[i]))
    }
  }
}


var page = new Pagination(htmlElements)

async function init() {

  await page.constructPage(1) //Inicia a página 1
  let sortPage = new SortPage(page, htmlElements)
  sortPage.addFilterButtonsInFields();
  // Como addShowAllOptionInSelect precisa de atributos
  // que pertencem ao objeto page, existe a necessidade
  // de função assíncrona para garantirmos que só cheguemos
  // até aqui após page estar totalmente definido
  addShowAllOptionInSelect(page.pageSize * page.totalPages)
}
