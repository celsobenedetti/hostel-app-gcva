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
