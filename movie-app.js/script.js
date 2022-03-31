const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=f46a0df02d8ae72dabc6080b8ec07c6f&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';

const IMG_PATH = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f46a0df02d8ae72dabc6080b8ec07c6f&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const rate = document.querySelector('span')

// Initially get fav movies
getMovies(API_URL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    
    showMovies(respData.results)
}

function showMovies(movies){
     // clear main
     main.innerHTML = ' '
     movies.forEach(movie => {
     
        const movieEl = document.createElement('div');  
        movieEl.classList.add('movie');

        if(movie.poster_path != null){
            movieEl.innerHTML = `

            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.original_title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${rateColor(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview"> 
            <h3> Overview: </br> ${movie.title}</h3>
              ${movie.overview}
            </div> 
            
         `
        main.appendChild(movieEl)
        }    
    })
}


function rateColor(rate){
    if(rate >= 8){
        return 'green';
    } else if (rate >= 6) {
        return 'orange';
    } else 
       return 'red';   
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_API + searchTerm)
        
        search.value = ''
    }
})
