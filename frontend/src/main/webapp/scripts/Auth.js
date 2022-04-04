//Implementar autenticação
class Auth {

  isAuth = () => !!sessionStorage.getItem("userCredencial")

  setAuth(userCredencial){
    sessionStorage.setItem("userCredencial", JSON.stringify(userCredencial))
  }

  // Se prepareAuth falhar (return false), quer dizer que nenhuma seção de login foi criada
  prepareAuth(axiosInstance) {
    var credencial = JSON.parse(sessionStorage.getItem("userCredencial"))

    if (credencial){
      axiosInstance.interceptors.request.use((config) => {
        config.auth = credencial;
        return config;
      })
      return true
    }
    return false
  }

  async login(username, password){
    const {data: response} = await axios.post("http://localhost:8080/backend/api/user/login", {
      username,
      password
    });
    if (response){
      this.setAuth({username, password})
      this.prepareAuth(axios)

    }

    return response
  }

  static logout(){
    sessionStorage.clear();
    window.location.reload()
  }

  static validate(axiosInstance){
    // Auth é uma classe em ./script/Auth.js
    const auth = new Auth()
    // Se prepareAuth falhar (return false), quer dizer que nenhuma seção de login foi criada
    if (!auth.prepareAuth(axiosInstance)) window.location.href = "../../index.html"

  }
}
