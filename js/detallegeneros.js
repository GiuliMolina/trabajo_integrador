let formulario = document.querySelector('.form')
let buscador = document.querySelector('.buscador')

formulario.addEventListener('submit', function(event){
  event.preventDefault();
  if(buscador.value == ''){
    alert('La búsqueda está vacía')
  }else if(buscador.value.length<3){
    alert('La búsqueda requiere más de 3 caracteres')
  }else{
    this.submit()
  }
})

let endpoint = 'https://api.themoviedb.org/3/discover/movie?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
let detalleGenero = location.search
let objDetalleGenero = new URLSearchParams(detalleGenero)
let id = objDetalleGenero.get('id')
let nameGenre = objDetalleGenero.get('name')
let conteiner = document.querySelector('.sectionpelis')
let titulo = document.querySelector('.titulo')
let type = objDetalleGenero.get('type')
console.log(type)
let genero = ''
let genero2 = ''

let endpointTv = 'https://api.themoviedb.org/3/discover/tv?api_key=0c5fb97f0c55576b638b49d73fa8d73e'
let detalleGeneroTv = location.search
let objTv = new URLSearchParams(detalleGeneroTv)
let id2 = objTv.get('id')
let nameGenre2 = objTv.get('name')
let type2 = objTv.get('type')
console.log(type2)
let conteiner2 = document.querySelector('.sectionseries')
let titulo2 = document.querySelector('.titulo2')
let generoTv = ''
let generoTv2 = ''

if(type == 'movie'){
  fetch(`${endpoint}&with_genres=${id}&name=${nameGenre}&type=${type}`)
  .then(function(resp){
    return resp.json()
})
.then(function(data){
  console.log(data)
  genero += `
  <article>
    <h3> Peliculas de ${nameGenre} </h3>
    </article>
  `
  titulo.innerHTML = genero
  for(let i=0; i<5; i++){
    genero2 += `
    <section class='sect'>
    <article class='pelis'>
    <h5 class='titulopelis'>${data.results[i].title} </h5>
    <img class='imgpelis' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    </section>
    `
  }
  for(let i=5; i<11; i++){
    genero2 += `
    <section class='sect'>
    <article class='pelis'>
    <h5 class='titulopelis'>${data.results[i].title} </h5>
    <img class='imgpelis' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    </section>
    `
  }
  for(let i=11; i<16; i++){
    genero2 += `
    <section class='sect'>
    <article class='pelis'>
    <h5 class='titulopelis'>${data.results[i].title} </h5>
    <img class='imgpelis' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    </section>
    `
  }
conteiner.innerHTML = genero2
})
.catch(function(error){
  console.log(error)
})
} 

else{
  fetch(`${endpointTv}&with_genres=${id2}&name=${nameGenre2}&type=${type2}`)
.then(function(resp){
  return resp.json()
})
.then(function(data){
  console.log(data)
  generoTv += `
  <article>
    <h3> Series de ${nameGenre2} </h3>
    </article>
  `
  titulo2.innerHTML = generoTv
  for(let i=0; i<5; i++){
    generoTv2 += `
    <section class='sect'>
    <article class='series'>
    <h5 class='tituloserie'>${data.results[i].name}</h5>
    <img class='imgseries' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    </section>
    `
  }
    for(let i=5; i<11; i++){
      generoTv2 += `
      <section class='sect'>
      <article class='series'>
      <h5 class='tituloserie'>${data.results[i].name}</h5>
      <img class='imgseries' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
      </article>
      </section>
      `
    }
      for(let i=11; i<16; i++){
        generoTv2 += `
        <section class='sect'>
        <article class='series'>
        <h5 class='tituloserie'>${data.results[i].name}</h5>
        <img class='imgseries' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
        </article>
        </section>
        `
      }
      
  conteiner2.innerHTML = generoTv2
})
.catch(function(error){
  console.log(error)
})


}


window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('links')){
    e.target.style.color = 'purple'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('links')){
    e.target.style.color= 'white'
  }
})











