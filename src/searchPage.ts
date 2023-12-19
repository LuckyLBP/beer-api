let currentPage = 1;
const perPage = 10;

interface Beer {
    id: number;
    name: string;
    tagline: string;
    abv: number;
    first_brewed: string;
    image_url: string;
}

interface SearchParams {
    beer_name?: string;
    abv_gt?: number;
    abv_lt?: number;
    beer_tagline?: string;
}

async function searchBeers(params: SearchParams, page: number): Promise<Beer[]> {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
            queryParams.append(key, params[key].toString());
        }
    });

    const apiUrl: string = `https://api.punkapi.com/v2/beers?${queryParams.toString()}&page=${page}&per_page=${perPage}`;
    
    try {
        const response: Response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        return await response.json() as Beer[];
    } catch (error: any) {
        console.error('Error searching for beers: ', error.message);
        return [];
    }
}

function createCard (beer: Beer): HTMLElement {
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

function displaySearchResults(beers: Beer[]): void {
    const searchResultsContainer = document.getElementById('searchResults') as HTMLElement;

    beers.forEach(beer => {
        const card = createCard(beer);
        searchResultsContainer.appendChild(card);
    });

    const loadMoreButton = document.getElementById('loadMoreButton') as HTMLButtonElement;
    if (beers.length === 0 || beers.length < perPage) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
}

document.getElementById('searchButton')?.addEventListener('click', async () => {
    const searchInput: HTMLInputElement = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput.value) {
        let searchParams: SearchParams = {};

        if (isNaN(parseFloat(searchInput.value))) {
            searchParams.beer_name = searchInput.value;
            searchParams.beer_tagline = searchInput.value;
        } else {
            searchParams.abv_gt = parseFloat(searchInput.value) - 0.1;
            searchParams.abv_lt = parseFloat(searchInput.value) + 0.1;
        }

        currentPage = 1;
        const beers: Beer[] = await searchBeers(searchParams, currentPage);
        const searchResultsContainer: HTMLElement = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = '';
        displaySearchResults(beers);
    }
});

document.getElementById('loadMoreButton')?.addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput && searchInput.value) {
        currentPage++;
        const beers = await searchBeers({ beer_name: searchInput.value }, currentPage);
        displaySearchResults(beers);
    }
});


