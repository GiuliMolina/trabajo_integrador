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

if(type){
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
  for(let i=0; i<data.results.length; i++){
    genero2 += `
    <section class='pelis'>
    <article>
    <h5>${data.results[i].title} </h5>
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

else if (type2){
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
  conteiner2.innerHTML = generoTv
  for(let i=0; i<data.results.length; i++){
    generoTv2 += `
    <article>
    <h5>${data.results[i].name}</h5>
    <img class='imgseries' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    `
  }
  conteiner2.innerHTML = generoTv2
})
.catch(function(error){
  console.log(error)
})


}










/*fetch(`${endpoint}&with_genres=${id}&name=${nameGenre}`)
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
  for(let i=0; i<data.results.length; i++){
    genero2 += `
    <section class='pelis'>
    <article>
    <h5>${data.results[i].title} </h5>
    <img class='imgpelis' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    </section>
    `
  }
conteiner.innerHTML = genero2
})
.catch(function(error){
  console.log(error)
})*/


let endpointTv = 'https://api.themoviedb.org/3/discover/tv?api_key=0c5fb97f0c55576b638b49d73fa8d73e'
let detalleGeneroTv = location.search
let objTv = new URLSearchParams(detalleGeneroTv)
let id2 = objTv.get('id')
let nameGenre2 = objTv.get('name')
let type2 = objTv.get('type')
console.log(type2)
let conteiner2 = document.querySelector('.sectionseries')
let generoTv = ''
let generoTv2 = ''

/*fetch(`${endpointTv}&with_genres=${id2}`)
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
    <h5>${data.results[i].name}</h5>
    <img class='imgseries' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
    </article>
    `
  }
  conteiner2.innerHTML = generoTv
})
.catch(function(error){
  console.log(error)
})*/

