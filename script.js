document.addEventListener("DOMContentLoaded", function () {

  // 1. LÓGICA DO BOTÃO (CORRIGIDA)
  const toggle = document.getElementById("modoEscuro");
  const body = document.body;

  toggle.addEventListener("click", () => {
    // Mudamos para 'light-mode' porque o padrão do seu CSS agora é escuro
    body.classList.toggle("light-mode");

    // Troca o ícone do botão para dar um feedback visual
    if (body.classList.contains("light-mode")) {
      toggle.innerText = "🌙 Modo Escuro";
    } else {
      toggle.innerText = "☀️ Modo Claro";
    }
  });

  // 2. MENSAGEM DE BOAS-VINDAS (EFEITO DIGITANDO)
  const saudacao = document.createElement("div");
  saudacao.classList.add("boas-vindas");
  saudacao.innerHTML = '<span id="textoDigitando"></span>';
  document.body.prepend(saudacao);

  const texto = "👋 Olá! Seja muito bem-vindo ao meu portfólio.";
  let i = 0;

  function digitar() {
    if (i < texto.length) {
      document.getElementById("textoDigitando").innerHTML += texto.charAt(i);
      i++;
      setTimeout(digitar, 50);
    } else {
      setTimeout(() => {
        saudacao.style.opacity = 0;
        saudacao.style.transition = "all 0.8s ease";
        saudacao.style.transform = "translateY(-50px)";
        // Remove do DOM após a animação para não atrapalhar o layout
        setTimeout(() => saudacao.remove(), 800);
      }, 4000);
    }
  }

  digitar();
});
