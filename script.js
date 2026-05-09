
// --- GESTÃO DE IMAGEM ---
const profileImg = document.getElementById('profile-img');
if (profileImg) {
    profileImg.addEventListener('error', function() {
        this.style.display = 'none';
        const placeholder = document.getElementById('img-placeholder');
        if (placeholder) placeholder.style.display = 'flex';
    });
}


// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    // Efeito de Escrita Atualizado
    const textElement = document.getElementById('type-text');
    const words = ["Vinícius", "Desenvolvedor em Formação", "Estudante de ADS", "Criador de Soluções"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        const current = words[wordIndex];
        textElement.innerText = current.substring(0, isDeleting ? charIndex-- : charIndex++);
        if (!isDeleting && charIndex > current.length) { isDeleting = true; setTimeout(type, 2000); }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(type, 500); }
        else { setTimeout(type, isDeleting ? 100 : 200); }
    }
    type();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Mobile Menu
    const btn = document.getElementById('mobile-btn');
    const closeBtn = document.getElementById('close-mobile-menu');
    const menu = document.getElementById('mobile-menu');
    if(btn) btn.addEventListener('click', () => menu.classList.remove('hidden'));
    if(closeBtn) closeBtn.addEventListener('click', () => menu.classList.add('hidden'));
    
   
    });
