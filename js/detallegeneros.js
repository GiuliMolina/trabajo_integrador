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
let genero = ''

fetch(`${endpoint}&with_genres=${id}&name=${nameGenre}`)
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
  for(let i=0; i<data.results.length; i++){
    genero += `
    
    <article>
    <h5>${data.results[i].title} </h5>
    <img class='imgpelis' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    `
  }
conteiner.innerHTML = genero
})
.catch(function(error){
  console.log(error)
})

<<<<<<< HEAD
let endpointTv = 'https://api.themoviedb.org/3/discover/tv?api_key=0c5fb97f0c55576b638b49d73fa8d73e'
let detalleGeneroTv = location.search
let objTv = new URLSearchParams(detalleGeneroTv)
let id2 = objTv.get('id')
let conteiner2 = document.querySelector('.sectionseries')
let generoTv = ''

fetch(`${endpointTv}&with_genres=${id}`)
.then(function(resp){
  return resp.json()
})
.then(function(data){
  console.log(data)
  generoTv += `
  <article>
    <h3> Series de ${id2} </h3>
    </article>
  `
  for(let i=0; i<data.results.length; i++){
    generoTv+= `
    <article>
    <h5>${data.results[i].original_name}</h5>
    <img class='imgseries' src='https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}' alt='${data.results[i].otiginal_name}>
    </article>
    `
    conteiner2.innerHTML = generoTv
  }
})
.catch(function(error){
  console.log(error)
})

