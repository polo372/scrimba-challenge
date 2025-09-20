const containerPrincipal = document.getElementById("container-principal")
const searchBtn = document.getElementById("search")
searchBtn.addEventListener("click",() => {
    fetch("http://www.omdbapi.com/?apikey=f01736b6&t=blade")
.then(res => res.json())
.then(data => {
    console.log(data)
    containerPrincipal.innerHTML = `<p> ${data.Titlte} ${data.imdbRating} </p>
    <img src="${data.Poster}"/>
    <button>add me to the localstorage</button>`
    })
})
