const main = document.querySelector(".main")
fetch(genres_list_http + new URLSearchParams({ //link de generos com os parametros de busca
    api_key: api_key
}))

.then(res => res.json())
.then(data => { /*chamando uma função para pegar filmes do genero*/
    data.genres.forEach(item => {
        fetchMoviesListGenres(item.id, item.name)
    });
})
/*Função q recebe um id e um genero*/
const fetchMoviesListGenres = (id, genres)=>{
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id, 
        page: Math.floor(Math.random()*3) +1 /*tras paginas aleatorias atraves do id*/
    }))
    .then(res => res.json())
    /* construindo categoria*/
    .then( data => { // nessa função passa o genero e os resultados
        makeCategoryElement(`${genres}_movies`, data.results)
    })
    .catch(err => console.log(err)) /*ERRO*/
}


const makeCategoryElement = (category, data) =>{
    main.innerHTML += `
        <div class="movie-list">
            <button class="pre-btn">
                <img src="img/prev.png" alt="previous button">
            </button>

            <h1 class="movie-category">${category.replace("_", " ")}</h1>
            
            <div class="movie-container" id="${category}">
                
            </div>

            <button class="next-btn">
                <img src="img/next.png" alt="next button">
            </button>
        </div> 
    `
    makeCards(category, data)
}

const makeCards = (id, data) =>{
    const movieContainer = document.getElementById(id)

    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path= item.poster_path;
            if(item.backdrop_path== null){
                return
            }
        }

        movieContainer.innerHTML += `
        <div class="movie">
            <img src="${img_url}${item.backdrop_path}" alt="poster">
                <p class="movie-title">${item.title}</p>
        </div>
        `
        //chama os botao
        if (i == data.lengt -1){
            setTimeout(()=>{
                setupScrooling()
            }, 100)
        }
            
    })
}