
class LoginController {

  constructor(titleRef){
    this.loginTitleRef = titleRef;
  }


  showString(element, data) {
      element.innerText = data
  }

  htmlDidMount() {
    let dataTest = {
      title: "Login Page"
    }
    this.showString(this.loginTitleRef, dataTest.title)
  }
}

function handleSubmit(e){
  const {username, password} = e.target.elements
  console.log(username.value)
  console.log(e)
  e.preventDefault()
  alert('e')
}

function init(){
  //title
  var titleRef = document.querySelector("body > h1")
  const controller = new LoginController(titleRef)
  controller.htmlDidMount()

  //form
  var form = document.querySelector("#formLogin")
  form.addEventListener("submit", handleSubmit)
}
