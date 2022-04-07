function showBanner(status, message) {
  getStatusContext = {
    error: {
      message: (messageError) => `Error: ${messageError}`,
      color: "#CC2222",
    },

    success: {
      message: (_) => `Sucesso`,
      color: "#008000",
    },
  };

  var body = document.querySelector("body");
  var banner = document.createElement("div");
  banner.id = "status-banner";
  banner.innerHTML = getStatusContext[status].message(message);
  banner.style.background = getStatusContext[status].color;
  banner.onanimationend = () => (banner.style.display = "none");
  banner.style.display = "flex";
  body.appendChild(banner);
}
