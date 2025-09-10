const search = document.getElementById("search")

search.addEventListener("click",fetch("http://www.omdbapi.com/?apikey=f01736b6&t=blade")
.then(res => res.json())
.then(data => console.log(data)) )
