const request = axios.create({ baseURL: "http://localhost:8080/backend/api/guests/" })
Auth.validate(request)


function showBanner(status, message){
  getStatusContext = {
    error: {
      message: (messageError) => `ERRO: ${messageError}`,
      color: "#CC2222"
    },

    success: {
      message: () => `Sucesso`,
      color: "#008000"
    }
  }
  var banner = document.querySelector("#status-banner")
  banner.innerHTML = getStatusContext[status].message(message)
  banner.style.display = 'flex';
  banner.style.background = getStatusContext[status].color
  banner.onanimationend = () => banner.style.display = 'none';
}

async function handleSubmit(e){
  e.preventDefault()
  const {firstName, lastName, address, email, phone, country, state} = e.target.elements

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    email: email.value,
    phone: phone.value,
    country: country.value,
    state: state.value
  }

  try {
    const response = await request.post("", data)
    showBanner("success", "")
  } catch (e){
    console.log(e.response)
    if (true){
        showBanner("error", "Os dados inseridos abaixo não são validos, tente novamente")
    } else {
        showBanner("error", "Causa desconhecida!")
    }
  }


}

function init(){

  //form
  var form = document.querySelector("#loginForm")
  form.addEventListener("submit", handleSubmit)
}
