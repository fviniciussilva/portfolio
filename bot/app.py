# -*- coding: utf-8 -*-

import urllib.parse
import streamlit as st

# Configuração do Contato WhatsApp (Formato internacional: DDI 55 + DDD 11 + Número)
NUMERO_WHATSAPP = "5511939432371"
WHATSAPP_FORMATADO = "(11) 93943-2371"

# 1. Configuração da página
st.set_page_config(
    page_title="Solutech Bot | Atendimento Inteligente",
    page_icon="📱",
    layout="wide"
)

# 2. CSS Customizado para Estilização Profissional
st.markdown("""
    <style>
    .main-header {
        font-size: 2.2rem;
        color: #1E3A8A;
        font-weight: 700;
        margin-bottom: 0px;
    }
    .sub-header {
        font-size: 1rem;
        color: #6B7280;
        margin-bottom: 10px;
    }
    .project-info {
        font-size: 0.85rem;
        color: #4B5563;
        margin-bottom: 15px;
        font-style: italic;
    }
    .contato-destaque {
        background-color: #e8f5e9;
        border: 1px solid #25D366;
        border-radius: 8px;
        padding: 10px 15px;
        margin-bottom: 20px;
        display: inline-block;
        font-weight: bold;
        color: #1b5e20;
    }
    .produto-card {
        background-color: #ffffff;
        border-left: 5px solid #25D366;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.08);
        color: #1f2937;
    }
    .btn-whatsapp {
        display: inline-block;
        background-color: #25D366;
        color: white !important;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 5px;
        font-weight: bold;
        font-size: 0.9rem;
        margin-top: 10px;
    }
    .btn-whatsapp:hover {
        background-color: #1eb854;
        color: white !important;
    }
    </style>
""", unsafe_allow_html=True)

# 3. Base de Dados de Telas
CATALOGO_SOLUTECH = {
    "iphone x": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "58,00", "varejo": "70,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "OLED VIVID", "atacado": "148,00", "varejo": "170,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru (Sem Aro)", "atacado": "135,00", "varejo": "150,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru (Com Aro)", "atacado": "155,00", "varejo": "170,00", "marca": "Apple"}
    ],
    "iphone xs": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "58,00", "varejo": "70,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "OLED VIVID", "atacado": "148,00", "varejo": "170,00", "marca": "Apple"}
    ],
    "iphone xs max": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "70,00", "varejo": "85,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "OLED VIVID", "atacado": "188,00", "varejo": "210,00", "marca": "Apple"}
    ],
    "iphone xr": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "60,00", "varejo": "75,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru (Sem Aro)", "atacado": "140,00", "varejo": "155,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru (Com Aro)", "atacado": "165,00", "varejo": "180,00", "marca": "Apple"}
    ],
    "iphone 11": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "60,00", "varejo": "75,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru Premium", "atacado": "160,00", "varejo": "180,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru Comum", "atacado": "125,00", "varejo": "140,00", "marca": "Apple"}
    ],
    "iphone 11 pro": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "76,00", "varejo": "90,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "OLED VIVID", "atacado": "190,00", "varejo": "215,00", "marca": "Apple"}
    ],
    "iphone 11 pro max": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "78,00", "varejo": "95,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "OLED VIVID", "atacado": "220,00", "varejo": "250,00", "marca": "Apple"}
    ],
    "iphone 12": [
        {"tabela": "iPhone Kanguru", "tipo": "HD + VIVID", "atacado": "82,00", "varejo": "100,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "OLED VIVID", "atacado": "225,00", "varejo": "255,00", "marca": "Apple"},
        {"tabela": "iPhone Kanguru", "tipo": "Kanguru Incell", "atacado": "190,00", "varejo": "215,00", "marca": "Apple"}
    ],
    "note 11 4g": [
        {"tabela": "Varejo & Atacado", "tipo": "Oled Com Aro", "atacado": "160,00", "varejo": "180,00", "marca": "Xiaomi"},
        {"tabela": "Varejo & Atacado", "tipo": "Incell", "atacado": "75,00", "varejo": "90,00", "marca": "Xiaomi"}
    ],
    "note 11s": [
        {"tabela": "Varejo & Atacado", "tipo": "Oled Com Aro", "atacado": "160,00", "varejo": "180,00", "marca": "Xiaomi"},
        {"tabela": "Telas Nacionais", "tipo": "OLED", "atacado": "140,00", "varejo": "140,00", "marca": "Xiaomi"}
    ],
    "note 11 pro": [
        {"tabela": "Varejo & Atacado", "tipo": "Oled Sem Aro", "atacado": "165,00", "varejo": "185,00", "marca": "Xiaomi"},
        {"tabela": "Varejo & Atacado", "tipo": "Incell", "atacado": "95,00", "varejo": "115,00", "marca": "Xiaomi"}
    ],
    "moto g22": [
        {"tabela": "Varejo & Atacado", "tipo": "Incell Sem Aro", "atacado": "58,00", "varejo": "70,00", "marca": "Motorola"},
        {"tabela": "Varejo & Atacado", "tipo": "Incell Com Aro", "atacado": "73,00", "varejo": "85,00", "marca": "Motorola"}
    ],
    "sm a01": [
        {"tabela": "Telas Nacionais", "tipo": "Nacional Com Aro", "atacado": "100,00", "varejo": "115,00", "marca": "Samsung"}
    ],
    "sm a03s": [
        {"tabela": "Telas Nacionais", "tipo": "Nacional Com Aro", "atacado": "105,00", "varejo": "120,00", "marca": "Samsung"}
    ],
    "sm a15": [
        {"tabela": "Telas Nacionais", "tipo": "Vivid Com Aro", "atacado": "135,00", "varejo": "150,00", "marca": "Samsung"}
    ],
    "hot 11": [
        {"tabela": "Telas Nacionais", "tipo": "Nacional Com Aro", "atacado": "100,00", "varejo": "115,00", "marca": "Infinix"}
    ],
    "realme c53": [
        {"tabela": "Telas Nacionais", "tipo": "Nacional Com Aro", "atacado": "105,00", "varejo": "120,00", "marca": "Realme"}
    ]
}

# 4. Barra Lateral (Sidebar)
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/4712/4712027.png", width=70)
    st.title("Painel de Consulta de Peças")
    
    st.markdown("### 📱 WhatsApp Comercial")
    st.markdown(f"**[{WHATSAPP_FORMATADO}](https://wa.me/{NUMERO_WHATSAPP})**")
    st.write("---")
    
    filtro_marca = st.selectbox(
        "🎯 Filtrar por Marca:",
        ["Todas", "Apple", "Motorola", "Samsung", "Xiaomi", "Realme", "Infinix"]
    )
    st.write("---")
    
    if st.button("🗑️ Limpar Histórico do Chat"):
        st.session_state.messages = [
            {"role": "assistant", "content": f"Olá! Sou o assistente virtual da Solutech. Digite o modelo de tela ou tecnologia que deseja consultar:"}
        ]
        st.rerun()

    st.write("---")
    st.markdown("**Desenvolvedor:** Fernando Vinícius")
    st.markdown("**Formação:** ADS (3º / 4º Semestre)")
    st.info("💡 **Exemplos de busca:** 'iPhone 11', 'OLED', 'Incell', 'Moto G22'")

# 5. Cabeçalho
st.markdown('<p class="main-header">🤖 Solutech Bot</p>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Central de Atendimento Inteligente - Consulta de Peças e Atendimento Direct</p>', unsafe_allow_html=True)
st.markdown('<p class="project-info">Consulta de Peças e Atendimento Direct, criado com Python e Streamlit. Bot gratuito e de código aberto, desenvolvido por Fernando Vinícius.</p>', unsafe_allow_html=True)

# Banner de Contato em Destaque
st.markdown(f'<div class="contato-destaque">📲 Atendimento WhatsApp: <strong>{WHATSAPP_FORMATADO}</strong></div>', unsafe_allow_html=True)

# 6. Motor de Busca Flexível e Inteligente
def realizar_busca(texto_cliente, marca_filtrada):
    busca = texto_cliente.strip().lower()
    busca_sem_espaco = busca.replace(" ", "")
    resultados = []
    
    for modelo, opcoes in CATALOGO_SOLUTECH.items():
        modelo_limpo = modelo.replace(" ", "")
        
        for opcao in opcoes:
            # Aplica filtro de marca se selecionado na Sidebar
            if marca_filtrada != "Todas" and marca_filtrada.lower() not in opcao["marca"].lower():
                continue
            
            # Verifica correspondência por modelo, marca, tecnologia/tipo ou tabela
            if (busca_sem_espaco in modelo_limpo or 
                modelo_limpo in busca_sem_espaco or 
                busca in opcao["tipo"].lower() or 
                busca in opcao["tabela"].lower() or
                busca in opcao["marca"].lower()):
                
                resultados.append((modelo.upper(), opcao))
                
    if not resultados:
        return f"❌ Desculpe, não encontrei nenhuma peça correspondente no estoque atual. Entre em contato direto pelo WhatsApp **{WHATSAPP_FORMATADO}** para consultar encomendas especiais."
        
    resposta_html = f"📢 <strong>FORAM ENCONTRADAS {len(resultados)} OPÇÃO(ÕES) NO ESTOQUE:</strong><br><br>"
    
    for modelo, dados in resultados:
        texto_wa = f"Olá! Gostaria de verificar a disponibilidade da tela {modelo} ({dados['tipo']}) no valor de R$ {dados['varejo']}."
        link_wa = f"https://wa.me/{NUMERO_WHATSAPP}?text={urllib.parse.quote(texto_wa)}"
        
        card = (
            f'<div class="produto-card">'
            f'<strong>📱 {modelo}</strong> ({dados["marca"]})<br>'
            f'🔹 <strong>Qualidade:</strong> {dados["tipo"]}<br>'
            f'📦 <strong>Tabela:</strong> {dados["tabela"]}<br>'
            f'💰 <strong>Atacado:</strong> R$ {dados["atacado"]} | 💵 <strong>Varejo:</strong> R$ {dados["varejo"]}<br>'
            f'<a href="{link_wa}" target="_blank" class="btn-whatsapp">📲 Encomendar no WhatsApp ({WHATSAPP_FORMATADO})</a>'
            f'</div>'
        )
        resposta_html += card
        
    return resposta_html

# 7. Gerenciamento do Chat (Session State)
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": f"Olá! Sou o assistente virtual da Solutech. Digite o modelo de tela ou tecnologia que deseja consultar hoje (ou fale conosco no {WHATSAPP_FORMATADO}):"}
    ]

for message in st.session_state.messages:
    avatar_icon = "🤖" if message["role"] == "assistant" else "👤"
    with st.chat_message(message["role"], avatar=avatar_icon):
        if message["role"] == "assistant":
            st.markdown(message["content"], unsafe_allow_html=True)
        else:
            st.markdown(message["content"])

# 8. Entrada do Usuário
if prompt := st.chat_input("Digite o modelo de tela ou tecnologia (Ex: iPhone 11, Incell, Moto G)..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar="👤"):
        st.markdown(prompt)

    with st.chat_message("assistant", avatar="🤖"):
        resposta = realizar_busca(prompt, filtro_marca)
        st.markdown(resposta, unsafe_allow_html=True)
    
    st.session_state.messages.append({"role": "assistant", "content": resposta})