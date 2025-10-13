// Affichage de la watchlist sur watchlist.html
document.addEventListener("DOMContentLoaded", () => {
    const main2 = document.getElementById("main2");
    if (main2) {
        // On est sur watchlist.html
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        if (movies.length === 0) {
            main2.innerHTML = "<p>Votre watchlist est vide.</p>";
        } else {
            // Pour chaque imdbID stocké, on va chercher les infos sur l'API OMDb
            Promise.all(movies.map(imdbId =>
                fetch(`http://www.omdbapi.com/?apikey=f01736b6&i=${imdbId}`)
                    .then(res => res.json())
            )).then(films => {
                main2.innerHTML = films.map(film =>
                    `<div class="movie-item">
                        <h2>${film.Title} (${film.Year})</h2>
                        <img src="${film.Poster}" alt="Poster" style="height:150px;">
                        <p>${film.Runtime} | ${film.Genre}</p>
                        <p>${film.Plot}</p>
                        <button onclick="removeFromWatchlist('${film.imdbID}')">Remove from Watchlist</button>
                    </div>`
                ).join("");
            });
        }
    }
    removeFromWatchlist = function(imdbId) {
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        movies = movies.filter(id => id !== imdbId);
        localStorage.setItem("movies", JSON.stringify(movies));
        location.reload();
    }

});
const containerPrincipal = document.getElementById("container-principal")
const searchBtn = document.getElementById("search")
const movieSearch = document.getElementById("movie-search")

//parse les elements deja stocker ou rien

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
                            // Création d'un élément temporaire pour parser le HTML
                            const tempDiv = document.createElement('div')
                            tempDiv.innerHTML =
                                `<p>${dataMovie.Title} ${dataMovie.imdbRating}</p>
                                 <p>${dataMovie.Runtime} ${dataMovie.Genre}</p>
                                 <div class="add-to-watchlist">
                                    <img src='icon_plus_white.png' id="${imdbId}Btn">
                                    <p>add me to the localstorage<p>
                                 </div>
                                 <p>${dataMovie.Plot}</p>
                                 <img src="${dataMovie.Poster}"/>`
                            // Ajoute le contenu au container principal
                            while (tempDiv.firstChild) {
                                containerPrincipal.appendChild(tempDiv.firstChild)
                            }
                            // Ajoute l'eventListener après que le bouton soit dans le DOM
                            const btn = document.getElementById(`${imdbId}Btn`)
                            if (btn) {
                                btn.addEventListener("click", () => {
                                    // 1. Récupérer la liste existante ou créer une nouvelle
                                    let movies = JSON.parse(localStorage.getItem("movies")) || [];
                                    // 2. Ajouter le film (ici, on stocke juste l’imdbID, mais tu peux stocker tout l’objet)
                                    if (!movies.includes(imdbId)) {
                                        movies.push(imdbId);
                                        localStorage.setItem("movies", JSON.stringify(movies));
                                        alert("Film ajouté !");
                                    } else {
                                        alert("Ce film est déjà dans la liste !");
                                    }
                                });
                            }
                })
            } }
            else {
                containerPrincipal.innerHTML = 
                    `<p>Unable to find what you’re looking for. Please try another search</p>`
            }
        })
})

