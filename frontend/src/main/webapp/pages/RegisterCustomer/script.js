const request = axios.create({ baseURL: "http://localhost:8080/backend/api/guests/" })
Auth.validate(request)

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
    const errorMessage = {
      "400": "Os dados inseridos abaixo não são validos, tente novamente",
      "401": "Vc precisa valer login: <a href='http://localhost:8080/frontend/pages/Login/'>Login</a>",
      "403": "Seu usuário não tem permissão para inserir hóspedes",
      "default": "Causa desconhecida!"
    }
    showBanner("error", errorMessage[e.response.status || "default"])
  }
}

function init(){

  //form
  var form = document.querySelector("#loginForm")
  form.addEventListener("submit", handleSubmit)
}
