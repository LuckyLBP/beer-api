async function fetchBeerDetails(beerId: string): Promise<void> {
    const apiUrl: string = `https://api.punkapi.com/v2/beers/${beerId}`;

    try {
        const response: Response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const beers: any[] = await response.json();
        if (beers.length > 0) {
            displayBeerDetails(beers[0]);
        }
    } catch (error: any) {
        console.error('Error fetching beer data: ', error.message);
    }
}

function displayBeerDetails(beer: any): void {

    ///// Product Info /////
    const productName: HTMLElement = document.getElementById('productName');
    const productDescription: HTMLElement = document.getElementById('productDescription');
    const productImage: HTMLImageElement = document.getElementById('productImage') as HTMLImageElement | null;
    const brewersTips: HTMLElement = document.getElementById('brewersTips')
    const foodPairing: HTMLUListElement = document.getElementById('productFoodPairing') as HTMLUListElement;

    productName.textContent = beer.name;
    productDescription.textContent = beer.description;
    brewersTips.textContent = beer.brewers_tips;

    
    beer.food_pairing.forEach((food: string) => {
        const li: HTMLLIElement = document.createElement('li');
        li.textContent = food;
        foodPairing.appendChild(li);
    });
    
    productImage.src = beer.image_url || './assets/No_image_available.svg.png';

    ///// Product Stats /////
    const productAbv: HTMLElement = document.getElementById('productAbv');
    const productVolume: HTMLElement = document.getElementById('productVolume');
    const productIbu: HTMLElement = document.getElementById('productIbu');
    const productEbc: HTMLElement = document.getElementById('productEbc');
    const productPh: HTMLElement = document.getElementById('productPh');
    const productBVolume: HTMLElement = document.getElementById('productBoilVolume');
    const targetFg: HTMLElement = document.getElementById('productTargetFg');
    const targetOg: HTMLElement = document.getElementById('productTargetOg');
    const productSrm: HTMLElement = document.getElementById('productSrm');
    const productAttenuationLevel: HTMLElement = document.getElementById('productAl');

    productAbv.textContent = `${beer.abv}%`;
    productVolume.textContent = beer.volume.value;
    productIbu.textContent = beer.ibu;
    productEbc.textContent = beer.ebc;
    productPh.textContent = beer.ph;
    productBVolume.textContent = beer.boil_volume.value;
    targetFg.textContent = beer.target_fg;
    targetOg.textContent = beer.target_og;
    productSrm.textContent = beer.srm;
    productAttenuationLevel.textContent = beer.attenuation_level;

    ///// Product Hops /////
    

    
}

const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
const beerId: string | null = urlParams.get('beerId');

if (beerId) {
    fetchBeerDetails(beerId);
}
