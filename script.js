const apiKey = ""; // Podes deixar vazio, o Gemini vai responder via ambiente se configurado

// --- GESTÃO DE IMAGEM ---
const profileImg = document.getElementById('profile-img');
if (profileImg) {
    profileImg.addEventListener('error', function() {
        this.style.display = 'none';
        const placeholder = document.getElementById('img-placeholder');
        if (placeholder) placeholder.style.display = 'flex';
    });
}

// --- FUNÇÃO GEMINI API ---
async function callGemini(prompt, systemInstruction = "") {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "Erro ao processar.";
    } catch (e) { return "Erro de ligação."; }
}

// --- MODAIS E CHAT ---
async function explainProject(name, context) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');
    document.getElementById('project-modal-title').innerText = `Análise: ${name}`;
    content.innerHTML = "A analisar...";
    modal.classList.remove('hidden');
    const res = await callGemini(`O Fernando é estudante de ADS. Analise este projeto dele: ${name} (${context}).`, "És um mentor técnico sénior.");
    content.innerText = res;
}

function closeProjectModal() { document.getElementById('project-modal').classList.add('hidden'); }
function openAIChat() { document.getElementById('ai-modal').classList.remove('hidden'); }
function closeAIChat() { document.getElementById('ai-modal').classList.add('hidden'); }

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-messages');
    const text = input.value.trim();
    if (!text) return;
    container.innerHTML += `<div class="bg-sky-600/20 p-4 rounded-2xl ml-8 text-white">${text}</div>`;
    input.value = '';
    const res = await callGemini(text, "És o assistente do Fernando Vinícius, estudante de ADS e aspirante a IA.");
    container.innerHTML += `<div class="bg-zinc-800 p-4 rounded-2xl mr-8 border border-zinc-700/50">${res}</div>`;
    container.scrollTop = container.scrollHeight;
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    // Efeito de Escrita
    const textElement = document.getElementById('type-text');
    const words = ["Vinícius", "Aspirante a IA", "Analista ADS", "Pesquisador"];
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
    
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
