document.addEventListener("DOMContentLoaded", function () {
    
    // ======================================================
    // 1. EFEITO DIGITANDO (MENSAGEM DE BOAS-VINDAS)
    // ======================================================
    
    const saudacao = document.createElement("div");
    saudacao.id = "mensagem-boas-vindas";
    
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

    saudacao.innerHTML = '<span id="textoDigitando"></span><span class="cursor">|</span>';
    document.body.prepend(saudacao);

    // Adiciona animação do cursor no CSS via JS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor { animation: blink 1s infinite; margin-left: 2px; }
    `;
    document.head.appendChild(style);

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
    
    const verificarScroll = () => {
        // Seleciona novamente para garantir que pegou todos após o DOM carregar
        const elementosAnimados = document.querySelectorAll('.projeto-card, .skill-card, .formacao-item, h2');
        const alturaJanela = window.innerHeight;
        const pontoDeAtivacao = 100;

        elementosAnimados.forEach((el) => {
            const posicaoTopo = el.getBoundingClientRect().top;
            if (posicaoTopo < alturaJanela - pontoDeAtivacao) {
                el.classList.add("ativo");
            }
        });
    };

    window.addEventListener("scroll", verificarScroll);
    // Pequeno delay para a primeira verificação não conflitar com o carregamento
    setTimeout(verificarScroll, 100); 
});
