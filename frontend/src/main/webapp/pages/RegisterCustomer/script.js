Auth.validate(api);

function showRegisterLoad(control) {
  var registerButton = document.getElementById("cadastrar");
  registerButton.innerHTML = control
    ? "<div id='page-load' style='display: flex;' class='load'></div>"
    : "Cadastrar";
  registerButton.style.backgroundColor = control ? "#2562FF" : "#C4C4C4";
}

function cleanFormFields(formFields) {
  for (let i in formFields) {
    formFields[i].value = "";
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const { firstName, lastName, address, email, phone, country, state } =
    e.target.elements;

  const data = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    email: email.value,
    phone: phone.value,
    country: country.value,
    state: state.value,
  };

  showRegisterLoad(true);
  try {
    const response = await api.post("guests/", data);
    showBanner("success", "");
    cleanFormFields(e.target.elements);
  } catch (e) {
    const errorMessage = {
      400: "Os dados inseridos abaixo não são validos, tente novamente",
      401: "Vc precisa valer login: <a href='http://localhost:8080/frontend/pages/Login/'>Login</a>",
      403: "Seu usuário não tem permissão para inserir hóspedes",
      default: "Causa desconhecida!",
    };
    showBanner("error", errorMessage[e.response.status || "default"]);
  } finally {
    showRegisterLoad(false);
  }
}

function init() {
  //form
  var form = document.querySelector("#registerForm");
  form.addEventListener("submit", handleSubmit);
}
