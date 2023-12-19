var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchRandomBeers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i <= 4; i++) {
            yield fetchAndDisplayBeer(`card${i}`);
        }
    });
}
function fetchAndDisplayBeer(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'https://api.punkapi.com/v2/beers/random';
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const [beer] = yield response.json();
            displayBeer(beer, cardId);
        }
        catch (error) {
            console.error('Error fetching beer data: ', error);
        }
    });
}
function displayBeer(beer, cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        const cardImg = card.querySelector('.cardImg');
        const cardTitle = card.querySelector('.cardTitle');
        const cardText = card.querySelector('.cardText');
        const cardAlc = card.querySelector('.cardAlc');
        const firstBrewed = card.querySelector('.cardFirstBrewed');
        cardImg.src = beer.image_url || './assets/No_image_available.svg.png';
        cardTitle.textContent = beer.name;
        cardText.textContent = beer.tagline;
        cardAlc.textContent = `${beer.abv}%`;
        firstBrewed.textContent = beer.first_brewed;
    }
    const productLink = card.querySelector('.productLink');
    if (productLink) {
        productLink.href = `productPage.html?beerId=${beer.id}`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchRandomBeers();
});
