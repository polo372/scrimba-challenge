const containerPrincipal = document.getElementById("container-principal")
const searchBtn = document.getElementById("search")
const movieSearch = document.getElementById("movie-search")

searchBtn.addEventListener("click", () => {
    // vide le container avant une nouvelle recherche
    containerPrincipal.innerHTML = ""
    let value = movieSearch.value
    fetch(`http://www.omdbapi.com/?apikey=f01736b6&s=${value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                for (let i = 0; i < data.Search.length; i++) {
                    let imdbId = data.Search[i].imdbID
                    fetch(`http://www.omdbapi.com/?apikey=f01736b6&i=${imdbId}`)
                        .then(res => res.json())
                        .then(dataMovie => {
                            console.log(dataMovie)
                            containerPrincipal.innerHTML += 
                            `<p>${dataMovie.Title} ${dataMovie.imdbRating}</p>
                             <p>${dataMovie.Runtime} ${dataMovie.Genre}</p>
                             <button id="${imdbId}.btn" >add me to the localstorage</button>
                             <p>${dataMovie.Plot}</p>
                             <img src="${dataMovie.Poster}"/>`
                        })
                }
            } else {
                containerPrincipal.innerHTML = 
                    `<p>Unable to find what you’re looking for. Please try another search</p>`
            }
        })
})
document.getElementById("${imdbId}.btn").addEventListener("click", ()=> {
    containerPrincipal.innerHTML = "OK !"
} )