window.addEventListener('load', function () {
  let cargaPrevia = document.querySelector('.spinCarga');
  // cargaPrevia.style.display = "none"
})

// Resultados de Películas

let qs1 = location.search; 
let qsto1 = new URLSearchParams(qs1);
let queryP = qsto1.get('busquedor'); 

console.log(qs1);

let tituloPrincipal = document.querySelector('.resultados1');
tituloPrincipal.innerText = `El término buscado es: ${queryP}`
let id = objDetalle.get("id")


let info = ''

fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0c5fb97f0c55576b638b49d73fa8d73e`)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);

  if (infoSearchMovies.length == 0) {
      let moviesNotFound = document.querySelector('.moviesNotFound')
      moviesNotFound.innerText = `No se han encontrado películas que coincidan con: ${queryP}`
  } else {

      for(let i=0; i<5; i++) {
               info +=                          `<section class="title">
                                                  <h2>${data.original_title}</h2>
                                                </section>

                                                <article class="imagen">
                                                  <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}" height="500px" width="300px">
                                                </article>

                                                <section class="section1">
                                                <article class="article1">
                                                  <h4> ESTRENO: </h4>
                                                  <p> ${data.release_date}</p>
                                                </article>
                                                <article class="article1">
                                                  <h4> DURACIÓN: </h5>
                                                  <p>${data.runtime} minutos </p>
                                                </article>
                                                <article class="article1">
                                                <h4> GÉNEROS:</h5>`
                                                for (let i=0; i<data.genres.length; i++){
                                                  let genero= data.genres[i].name
                                                  let idgenero= data.genres[i].id
                                                  info+=(`
                                                      <a class="generos" href="./generos.html?id=${idgenero}"> ${genero}</a></article> `)}
                                                      
                                                info+=`
                                                <article class="article1">
                                                  <h4> RATING: </h4>
                                                  <p> ${data.vote_average}</p>
                                                </article>
                                                <article class="article2">
                                                  <p>${data.overview}</p>
                                                </article>`
              console.log(infoSearchMovies[i].poster_path);

          
      }
  }
      peliculasEncontradas.innerHTML = articulosPeliculasEncontradas;


})

.catch(function(error){
  console.log(error)
})



// Resultado de series

let qs2 = location.search
let qsto2 = new URLSearchParams(qs2);
let queryS = qsto2.get('busquedor'); 

let detalleseries= `https://api.themoviedb.org/3/tv/${id}`
let apiKey2 = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';

fetch(detalleseries+apiKey2)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);
  let infoSearchSeries = data.results;
  let articulosSeriesEncontradas = '';
  let seriesEncontradas = document.querySelector('.seriesEncontradas')

  if (infoSearchSeries.length == 0) {
      let seriesNotFound = document.querySelector('.seriesNotFound')
      seriesNotFound.innerText = `No se han encontrado series que coincidan con: ${queryS}`
  } else {
      for (let i=0; i<5; i++) {
      articulosSeriesEncontradas += ``
  
  seriesEncontradas.innerHTML = articulosSeriesEncontradas;
} }
})


.catch(function(error){
  console.log(error);
})

// formulario de búsqueda 
let formulario = document.querySelector('form');
let inputField = document.querySelector('.search');
let message = document.querySelector('.message');

formulario.addEventListener('submit', function(evento){
evento.preventDefault();
console.log('No se envió')

if(inputField.value == ""){
  message.innerText = "No has ingresado ningún término";
} else if (inputField.value.length < 3) {
  message.innerText = "Debes ingresar al menos 3 caracteres"
} else {
  this.submit();
}
})

// validacion formulario de búsqueda mobile
let formularioM = document.querySelector('.formBusquedaMobile');
let inputFieldM = document.querySelector('.searchM');
let messageM = document.querySelector('.messageM');

formularioM.addEventListener('submit', function(evento){
  evento.preventDefault();
  console.log('No se envió')

if(inputFieldM.value == ""){
  messageM.innerText = "No has ingresado ningún término, ingrese de nuevo por favor";
  messageM.style.textAlign= "center"
} else if (inputFieldM.value.length < 2) {
  messageM.innerText = "Debes ingresar al menos 2 caracteres"
  messageM.style.textAlign= "center"
} else {
  this.submit();
}
})



