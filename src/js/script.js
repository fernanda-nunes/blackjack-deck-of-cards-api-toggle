const toggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');

if(savedTheme) {
    body.classList.add(savedTheme);
    toggle.checked = true;
}

toggle.addEventListener('click', () => {
        if (toggle.checked) {
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');

        }else {
                body.classList.remove('dark');
                localStorage.removeItem('theme');
        }
    })


document.getElementById('comprar-carta').addEventListener('click', ()=>{
comprarUmaCartaAleatoriaDoBaralho()
})


async function criarBaralhoEmbaralhado (){
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    const resposta = await fetch(url)
    return await resposta.json()
    
}

async function tirarUmaCarta(deck_id) {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    const resposta = await fetch (url)
    return await resposta.json()
}

async function comprarUmaCartaAleatoriaDoBaralho() {
    const baralho = await criarBaralhoEmbaralhado()
    const carta = await tirarUmaCarta(baralho.deck_id)
    const imagemCarta = carta.cards[0].image
    document.getElementById('carta').src = imagemCarta
}

comprarUmaCartaAleatoriaDoBaralho()
