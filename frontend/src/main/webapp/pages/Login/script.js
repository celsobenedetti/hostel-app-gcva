async function handleLogin(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("pass").value;

	// if(password.length < 8){
	// 	// showBanner é uma função em ./scrips/banner.js
	// 	showBanner("error", "A senha deve conter 8 caracteres");
	// 	return;
	// }

	try {
		// response retorna true para sucesso, e false para error
		const auth = new Auth()
		const response = await auth.login(username, password) //Auth é um classe em ./scripts/Auth.js
		if (response) {
			showBanner('success', "Login realizado com sucesso")
			window.location.href = "../../index.html"
		} else {
			showBanner('error', "Usuário ou senha inválidos")

		}
	} catch (e) {
		showBanner('error', "Desconhecido!")
	}
}

function init (){
	var login = document.getElementById("login");

	login.addEventListener('click', handleLogin)

}
