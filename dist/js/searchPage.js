var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
let currentPage = 1;
const perPage = 10;
function searchBeers(params, page) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined) {
                queryParams.append(key, params[key].toString());
            }
        });
        const apiUrl = `https://api.punkapi.com/v2/beers?${queryParams.toString()}&page=${page}&per_page=${perPage}`;
        try {
            const response = yield fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            return yield response.json();
        }
        catch (error) {
            console.error('Error searching for beers: ', error.message);
            return [];
        }
    });
}
function createCard(beer) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    
    <section id="cards">
    <div class="cardContainer">
      <img class="cardImg" src="${beer.image_url || './assets/No_image_available.svg.png'}" alt="" />
      <h2 class="cardTitle">${beer.name}</h2>
      <p class="cardText">${beer.tagline}</p>
      <div class="cardStats">
          <h3 class="cardAlc">${beer.abv}%</h3>
          <h3 class="cardFirstBrewed">${beer.first_brewed}</h3>
      </div>
      <a class="productLink" href="productPage.html?beerId=${beer.id}">See more</a>
    </div>`;
    return card;
}
function displaySearchResults(beers) {
    const searchResultsContainer = document.getElementById('searchResults');
    beers.forEach(beer => {
        const card = createCard(beer);
        searchResultsContainer.appendChild(card);
    });
    const loadMoreButton = document.getElementById('loadMoreButton');
    if (beers.length === 0 || beers.length < perPage) {
        loadMoreButton.style.display = 'none';
    }
    else {
        loadMoreButton.style.display = 'block';
    }
}
(_a = document.getElementById('searchButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value) {
        let searchParams = {};
        if (isNaN(parseFloat(searchInput.value))) {
            searchParams.beer_name = searchInput.value;
            searchParams.beer_tagline = searchInput.value;
        }
        else {
            searchParams.abv_gt = parseFloat(searchInput.value) - 0.1;
            searchParams.abv_lt = parseFloat(searchInput.value) + 0.1;
        }
        currentPage = 1;
        const beers = yield searchBeers(searchParams, currentPage);
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = '';
        displaySearchResults(beers);
    }
}));
(_b = document.getElementById('loadMoreButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value) {
        currentPage++;
        const beers = yield searchBeers({ beer_name: searchInput.value }, currentPage);
        displaySearchResults(beers);
    }
}));
