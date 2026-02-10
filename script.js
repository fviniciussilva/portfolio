document.addEventListener("DOMContentLoaded", function () {
    
    // ======================================================
    // 1. EFEITO DIGITANDO (MENSAGEM DE BOAS-VINDAS)
    // ======================================================
    
    // Cria a caixinha da mensagem
    const saudacao = document.createElement("div");
    saudacao.id = "mensagem-boas-vindas";
    
    // Estiliza via JS
    Object.assign(saudacao.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(22, 27, 34, 0.95)',
        color: '#89CFF0',
        border: '1px solid #30363d',
        padding: '10px 20px',
        borderRadius: '8px',
        fontFamily: "'Segoe UI', monospace",
        fontSize: '14px',
        zIndex: '9999',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        textAlign: 'center',
        width: 'max-content',
        opacity: '1',
        transition: 'opacity 0.8s ease, transform 0.8s ease'
    });

    saudacao.innerHTML = '<span id="textoDigitando"></span><span style="animation: blink 1s infinite">|</span>';
    document.body.prepend(saudacao);

    const texto = "👋 Olá! Seja bem-vindo ao meu portfólio.";
    const velocidade = 50; 
    let i = 0;

    function digitar() {
        const target = document.getElementById("textoDigitando");
        if (target && i < texto.length) {
            target.innerHTML += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        } else {
            // Espera 3 segundos e some
            setTimeout(() => {
                saudacao.style.opacity = "0";
                saudacao.style.transform = "translate(-50%, -20px)";
                setTimeout(() => {
                    if (saudacao.parentNode) saudacao.parentNode.removeChild(saudacao);
                }, 800);
            }, 3000);
        }
    }
    digitar();

    // ======================================================
    // 2. SCROLL REVEAL (ANIMAÇÃO AO ROLAR A TELA)
    // ======================================================
    
    // Seleciona os elementos que vão ser animados
    const elementosAnimados = document.querySelectorAll('.projeto-card, .skill-card, .formacao-item, h2');

    const verificarScroll = () => {
        const alturaJanela = window.innerHeight;
        const pontoDeAtivacao = 100; // Distância do fundo para ativar

        elementosAnimados.forEach((el) => {
            const posicaoTopo = el.getBoundingClientRect().top;

            if (posicaoTopo < alturaJanela - pontoDeAtivacao) {
                el.classList.add("ativo"); // Adiciona a classe que faz aparecer
            }
        });
    };

    window.addEventListener("scroll", verificarScroll);
    verificarScroll(); // Chama uma vez ao carregar
});
