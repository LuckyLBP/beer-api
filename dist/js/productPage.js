var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchBeerDetails(beerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `https://api.punkapi.com/v2/beers/${beerId}`;
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const beers = yield response.json();
            if (beers.length > 0) {
                displayBeerDetails(beers[0]);
            }
        }
        catch (error) {
            console.error('Error fetching beer data: ', error.message);
        }
    });
}
function displayBeerDetails(beer) {
    ///// Product Info /////
    const productName = document.getElementById('productName');
    const productDescription = document.getElementById('productDescription');
    const productImage = document.getElementById('productImage');
    const brewersTips = document.getElementById('brewersTips');
    const foodPairing = document.getElementById('productFoodPairing');
    productName.textContent = beer.name;
    productDescription.textContent = beer.description;
    brewersTips.textContent = beer.brewers_tips;
    beer.food_pairing.forEach((food) => {
        const li = document.createElement('li');
        li.textContent = food;
        foodPairing.appendChild(li);
    });
    productImage.src = beer.image_url || './assets/No_image_available.svg.png';
    ///// Product Stats /////
    const productAbv = document.getElementById('productAbv');
    const productVolume = document.getElementById('productVolume');
    const productIbu = document.getElementById('productIbu');
    const productEbc = document.getElementById('productEbc');
    const productPh = document.getElementById('productPh');
    const productBVolume = document.getElementById('productBoilVolume');
    const targetFg = document.getElementById('productTargetFg');
    const targetOg = document.getElementById('productTargetOg');
    const productSrm = document.getElementById('productSrm');
    const productAttenuationLevel = document.getElementById('productAl');
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
const urlParams = new URLSearchParams(window.location.search);
const beerId = urlParams.get('beerId');
if (beerId) {
    fetchBeerDetails(beerId);
}
