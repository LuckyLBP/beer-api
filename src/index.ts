async function fetchRandomBeers(): Promise<void> {
    for (let i = 1; i <= 4; i++) {
        await fetchAndDisplayBeer(`card${i}`);
    }
}

async function fetchAndDisplayBeer(cardId: string): Promise<void> {
    const apiUrl: string = 'https://api.punkapi.com/v2/beers/random';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const [beer] = await response.json();
        displayBeer(beer, cardId);
    } catch (error) {
        console.error('Error fetching beer data: ', error);
    }
}

function displayBeer(beer: any, cardId: string): void {
    const card = document.getElementById(cardId);
    if (card) {
        const cardImg = card.querySelector('.cardImg') as HTMLImageElement;
        const cardTitle = card.querySelector('.cardTitle') as HTMLElement;
        const cardText = card.querySelector('.cardText') as HTMLElement;
        const cardAlc = card.querySelector('.cardAlc') as HTMLElement;
        const firstBrewed = card.querySelector('.cardFirstBrewed') as HTMLElement;

        cardImg.src = beer.image_url || './assets/No_image_available.svg.png';
        cardTitle.textContent = beer.name;
        cardText.textContent = beer.tagline;
        cardAlc.textContent = `${beer.abv}%`;
        firstBrewed.textContent = beer.first_brewed;

    }

    const productLink = card.querySelector('.productLink') as HTMLAnchorElement;
    if (productLink) {
        productLink.href = `productPage.html?beerId=${beer.id}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRandomBeers();
});


const randomBeerButton = document.getElementById('randomBeerButton');

randomBeerButton.addEventListener('click', () => {
    const apiUrlRandom: string = 'https://api.punkapi.com/v2/beers/random';

    fetch(apiUrlRandom)
        .then(response => response.json())
        .then(data => {
            const [beer] = data;
            window.location.href = `productPage.html?beerId=${beer.id}`;
        })
        .catch(error => {
            console.error('Error fetching random beer: ', error);
        });

        console.log('Click')
});

