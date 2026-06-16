/**
 * Lógica do Site: Jogo de Tarot + Páginas
 */

// DADOS DAS CARTAS
const tarotData = [
    { id: 0, name: "O Louco", meaning: "Novos começos, aventuras e um salto de fé.", imagem: "img/0-oLouco.webp" },
    { id: 1, name: "O Mago", meaning: "Manifestação, poder criativo e habilidade.", imagem: "img/1-oMagico.webp" },
    { id: 2, name: "A Sacerdotisa", meaning: "Intuição, mistério e sabedoria interior.", imagem: "img/2-aAltaSacerdotisa.jpg" },
    { id: 3, name: "A Imperatriz", meaning: "Fertilidade, criatividade e abundância.", imagem: "img/3-aImperatriz.webp" },
    { id: 4, name: "O Imperador", meaning: "Estrutura, autoridade e estabilidade.", imagem: "img/4-oImperador.webp" },
    { id: 5, name: "O Hierofante", meaning: "Tradição, conformidade e moralidade.", imagem: "img/5-oHierofante.webp" },
    { id: 6, name: "Os Enamorados", meaning: "Amor, harmonia e escolhas de valor.", imagem: "img/6-osAmantes.webp" },
    { id: 7, name: "O Carro", meaning: "Controle, vontade e vitória.", imagem: "img/7-aCarruagem.jpg" },
    { id: 8, name: "A Força", meaning: "Coragem, persuasão e compaixão.", imagem: "img/8-Forca.webp" },
    { id: 9, name: "O Eremita", meaning: "Busca da alma e introspecção.", imagem: "img/9-oEremita.webp" },
    { id: 10, name: "Roda da Fortuna", meaning: "Ciclos de vida, destino e viradas.", imagem: "img/10-rodaDaFortuna.webp" },
    { id: 11, name: "A Justiça", meaning: "Justiça, imparcialidade e verdade.", imagem: "img/11-justica.webp" },
    { id: 12, name: "O Enforcado", meaning: "Pausa, rendição e novas perspectivas.", imagem: "img/12-oEnforcado.png" },
    { id: 13, name: "A Morte", meaning: "Fim de um ciclo e transformação.", imagem: "img/13-morte.webp" },
    { id: 14, name: "A Temperança", meaning: "Equilíbrio, moderação e propósito.", imagem: "img/14-temperanca.webp" },
    { id: 15, name: "O Diabo", meaning: "Vício, materialismo e apego.", imagem: "img/15-oDiabo.webp" },
    { id: 16, name: "A Torre", meaning: "Mudança repentina e revelação.", imagem: "img/16-aTorre.webp" },
    { id: 17, name: "A Estrela", meaning: "Esperança, fé e espiritualidade.", imagem: "img/17-aEstrela.webp" },
    { id: 18, name: "A Lua", meaning: "Ilusão, medo e o inconsciente.", imagem: "img/18-aLua.webp" },
    { id: 19, name: "O Sol", meaning: "Positividade, sucesso e vitalidade.", imagem: "img/19-oSol.jpg" },
    { id: 20, name: "O Julgamento", meaning: "Renascimento, chamado interior e perdão.", imagem: "img/20-julgamento.webp" },
    { id: 21, name: "O Mundo", meaning: "Conclusão, integração e realização.", imagem: "img/21-oMundo.webp" }
];

// Funções Auxiliares
function embaralhar(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// --- INICIALIZAÇÃO SEGURA ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LÓGICA DA PÁGINA INFORMATIVA (Index)
    // Só roda se o elemento existir na página
    const infoGrid = document.getElementById('all-cards-grid');
    if (infoGrid) {
        populateInfoCards();
    }

    // 2. LÓGICA DO JOGO (Jogo Tarot)
    // Só roda se os elementos do jogo existirem
    const btnStart = document.querySelector('.botaoIniciarJogoTarot');
    const btnCloseModal = document.querySelector('.fecharModal');
    const btnReset = document.querySelector('.botaoResetarJogo');

    if (btnStart && btnCloseModal && btnReset) {
        setupGameLogic();
    }
});

// Função para popular cards na página de info
function populateInfoCards() {
    const grid = document.getElementById('all-cards-grid');
    grid.innerHTML = '';
    
    tarotData.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'info-card';
        
        cardDiv.innerHTML = `
            <img src="${card.imagem}" alt="${card.name}" onerror="this.src='https://picsum.photos/seed/${card.id}/150/200'">
            <h4>${card.id}. ${card.name}</h4>
            <p>${card.meaning}</p>
        `;
        
        grid.appendChild(cardDiv);
    });
}

// Configuração do Jogo
function setupGameLogic() {
    // Referências específicas do jogo
    const gameElements = {
        startScreen: document.querySelector('#telaDeInicio'),
        playScreen: document.querySelector('#telaDeJogo'),
        cardContainer: document.querySelector('#card-container'),
        modal: document.querySelector('#result-modal'),
        modalImg: document.querySelector('#modal-img'),
        modalTitle: document.querySelector('#tituloModal'),
        modalDesc: document.querySelector('#descricaoModal'),
        btnStart: document.querySelector('.botaoIniciarJogoTarot'),
        btnCloseModal: document.querySelector('.fecharModal'),
        btnReset: document.querySelector('.botaoResetarJogo')
    };

    // Event Listeners
    gameElements.btnStart.addEventListener("click", () => iniciarJogoTarot(gameElements));
    gameElements.btnCloseModal.addEventListener('click', () => fecharModal(gameElements));
    gameElements.btnReset.addEventListener("click", () => resetarJogo(gameElements));
}

function iniciarJogoTarot(elements) {
    elements.startScreen.classList.remove('active');
    elements.playScreen.classList.add('active');
    renderizarCartas(elements);
}

function renderizarCartas(elements) {
    elements.cardContainer.innerHTML = '';
    
    const shuffledDeck = embaralhar([...tarotData]);
    const selectedCards = shuffledDeck.slice(0, 12); 

    selectedCards.forEach((card, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'card-wrapper';
        
        cardWrapper.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        cardWrapper.style.opacity = '0'; 

        const imgUrl = card.imagem;
        
        cardWrapper.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${imgUrl}" alt="${card.name}" onerror="this.src='https://picsum.photos/seed/erro/200/300'">
                    <span>${card.name}</span>
                </div>
                <div class="card-back"></div>
            </div>
        `;

        cardWrapper.onclick = () => selecionarCarta(cardWrapper, card, imgUrl, elements);

        elements.cardContainer.appendChild(cardWrapper);
    });
}

function selecionarCarta(selectedElement, cardData, imgUrl, elements) {
    selectedElement.classList.add('flipped');

    const allCards = document.querySelectorAll('.card-wrapper');
    allCards.forEach(card => {
        if (card !== selectedElement) {
            card.classList.add('dimmed');
        }
    });

    setTimeout(() => {
        mostrarResultado(cardData, imgUrl, elements);
    }, 800);
}

function mostrarResultado(cardData, imgUrl, elements) {
    elements.modalImg.src = imgUrl;
    elements.modalTitle.innerText = cardData.name;
    elements.modalDesc.innerText = cardData.meaning;
    elements.modal.classList.add('open');
}

function fecharModal(elements) {
    elements.modal.classList.remove('open');
}

function resetarJogo(elements) {
    elements.modal.classList.remove('open');
    elements.playScreen.classList.remove('active');
    elements.startScreen.classList.add('active');
    elements.cardContainer.innerHTML = '';
    
    // Limpa estados visuais das cartas caso ainda existam no DOM
    const allCards = document.querySelectorAll('.card-wrapper');
    allCards.forEach(card => card.remove());
}