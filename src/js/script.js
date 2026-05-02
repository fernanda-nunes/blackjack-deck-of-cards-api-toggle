
    // Lógica para comprar cartas

let valorCarta1 = 0;
let valorCarta2 = 0;
let carta1Clicada = false;
let carta2Clicada = false;

function exibirMensagemPersonalizada(texto) {
    let modal = document.getElementById('modal-alerta');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-alerta';
        modal.innerHTML = `
            <div class="modal-conteudo">
                <p id="modal-texto"></p>
                <button id="fechar-modal">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('fechar-modal').addEventListener('click', () => {
            modal.classList.remove('visivel');
        });
    }
    document.getElementById('modal-texto').innerHTML = texto;
    modal.classList.add('visivel');
}

function traduzirValorParaNumero(valor) {
    if (valor === "JACK" || valor === "QUEEN" || valor === "KING") return 10;
    if (valor === "ACE") return 1;
    return parseInt(valor);
}

function verificarResultado() {
    // Só executa a soma se as duas cartas foram clicadas manualmente
    if (carta1Clicada && carta2Clicada) {
        const soma = valorCarta1 + valorCarta2;
        
        // Usamos um pequeno delay para que a imagem da carta apareça antes do alerta
        setTimeout(() => {
            if (soma === 21) {
                exibirMensagemPersonalizada(`Você fez <strong>${soma}</strong> pontos. Parabéns você ganhou! 😄🎉`);
            } else {
                exibirMensagemPersonalizada(`Não foi dessa vez. Sua pontuação foi <strong>${soma}</strong> pontos. Tente novamente!`);
            }
            // Reseta o estado para uma nova rodada
            carta1Clicada = false;
            carta2Clicada = false;

            // Volta as cartas para o verso
            document.getElementById('carta').src = "https://www.deckofcardsapi.com/static/img/back.png";
            document.getElementById('carta-2').src = "https://www.deckofcardsapi.com/static/img/back.png";
        }, 300);
    }
}

document.getElementById('comprar-carta').addEventListener('click', () => {
    if (carta1Clicada && !carta2Clicada) {
        exibirMensagemPersonalizada("Clica na carta 2 primeiro!");
        return;
    }
    comprarUmaCartaAleatoriaDoBaralho('carta')
    carta1Clicada = true;
});

document.getElementById('comprar-carta-2').addEventListener('click', () => {
    comprarUmaCartaAleatoriaDoBaralho('carta-2')
    carta2Clicada = true;
});

async function criarBaralhoEmbaralhado (){
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    const resposta = await fetch(url)
    return await resposta.json()
}

async function tirarCartas(deck_id, quantidade) {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${quantidade}`
    const resposta = await fetch(url)
    return await resposta.json()
}

async function comprarUmaCartaAleatoriaDoBaralho(idElemento) {
    try {
        const baralho = await criarBaralhoEmbaralhado()
        const dadosDoBaralho = await tirarCartas(baralho.deck_id, 1)
        
        const elementoCarta = document.getElementById(idElemento)
        const cartaSorteada = dadosDoBaralho.cards[0]

        if (elementoCarta && cartaSorteada) {
            elementoCarta.src = cartaSorteada.image
            
            // Atualiza o valor correspondente dependendo de qual botão foi clicado
            const valorNumerico = traduzirValorParaNumero(cartaSorteada.value);
            if (idElemento === 'carta') valorCarta1 = valorNumerico;
            else valorCarta2 = valorNumerico;

            verificarResultado();
        }
    } catch (error) {
        console.error("Erro ao buscar a carta:", error)
    }
}

// Lógica do Accordion Curiosidades
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('ativo');
    });
});
