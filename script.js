document.addEventListener("DOMContentLoaded", function () {
    
    // --- EFEITO DE DIGITAÇÃO (BOAS-VINDAS) ---
    
    // 1. Criar o elemento da mensagem via JavaScript
    const saudacao = document.createElement("div");
    saudacao.id = "mensagem-boas-vindas";
    
    // 2. Estilizar a mensagem diretamente aqui para garantir que fique bonita
    Object.assign(saudacao.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(22, 27, 34, 0.95)', // Fundo escuro levemente transparente
        color: '#89CFF0', // Azul Bebê
        border: '1px solid #30363d',
        padding: '10px 20px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px',
        zIndex: '9999', // Fica na frente de tudo
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        textAlign: 'center',
        width: 'max-content'
    });

    saudacao.innerHTML = '<span id="textoDigitando"></span><span class="cursor">|</span>';
    document.body.prepend(saudacao);

    // 3. Lógica da digitação
    const texto = "👋 Olá! Seja bem-vindo ao meu portfólio.";
    const velocidade = 50; // velocidade em milissegundos
    let i = 0;

    function digitar() {
        const target = document.getElementById("textoDigitando");
        if (target && i < texto.length) {
            target.innerHTML += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        } else {
            // Quando terminar de digitar, espera 3 segundos e some
            setTimeout(() => {
                saudacao.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                saudacao.style.opacity = "0";
                saudacao.style.transform = "translate(-50%, -20px)"; // Sobe um pouquinho
                
                // Remove do HTML depois que sumir visualmente
                setTimeout(() => {
                    if (saudacao.parentNode) {
                        saudacao.parentNode.removeChild(saudacao);
                    }
                }, 800);
            }, 3000);
        }
    }

    // Inicia o efeito
    digitar();
});
