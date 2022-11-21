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
let detalle2 =location.search
let objDetalle2 = new URLSearchParams(detalle2)
let id = objDetalle2.get("id")

let detalleseries= `https://api.themoviedb.org/3/tv/${id}`
let providers= `https://api.themoviedb.org/3/tv/${id}/watch/providers`
let apiKey = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';
let contenedor = document.querySelector(".contenedor")
let contenedor_recomedations = document.querySelector(".recomendacion")
let contenedorProviders = document.querySelector(".providers")
let conteinerReviewsTv = document.querySelector('.reviewstv')


//watch providers

fetch(providers+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data.results)
  prov=""
  prov+=`
  <h4> DONDE VER: </h4>
  `
  for(let i=0; i<data.results.US.flatrate.length; i++){
  prov+=`
    <img class="imgprov" src="https://image.tmdb.org/t/p/w500/${data.results.US.flatrate[i].logo_path}" > 
  `}
  contenedorProviders.innerHTML= prov
})
.catch(function(error){
  console.log(error)
})
fetch(detalleseries+apiKey)
.then(function(response){
    return response.json();
  })
.then(function(data){
    console.log(data)
      let info =''
        info+=` <article class="title">
                    <h2>${data.name}</h2>
                  </article>
                <section class="section1">
                  <article class="imagen">
                  <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}" height="500px" width="300px">
                  </article>
                <section class="section2">
                  <article class="article2">
                    <h3> Sinopsis:</h3>
                    <p class='overview'>${data.overview}</p>
                  </article>
                  <article class="article1">
                    <h3>Sobre ${data.name}</h3>
                  </article>
                  <article class="article1">
                    <h4> ESTRENO: </h4>
                    <p> ${data.first_air_date}</p>
                  </article>
                  <article class="article1">
                    <h4> GÉNEROS:</h4>
                    `
                    for (let i=0; i<data.genres.length; i++){
                    let genero= data.genres[i].name
                    let idgenero= data.genres[i].id
                    info+=(`
                        <a class="generos" href="./generos.html?id=${idgenero}"> ${genero}</a> `)}
                        
                  info+=`
                  </article>
                  <article class="article1">
                    <h4> RATING: </h4>
                    <p> ${data.vote_average}</p>
                  </article>
                  <article class=providers>
                    ${prov}
                  </article>
            
         `
//contenedor.innerHTML= info       
  ///BOTON FAVORITOS///
  
    let favoritos = obtenerfav()
    let elementoFav = favoritos.includes(data.id)
    console.log(elementoFav)
    let text = ''
    if (elementoFav){
      text = 'Eliminar de favoritos'
    }else{
      text = 'Agregar a favoritos'
    }
      //console.log(text)
      info += `     <section class="section1">
                    <article>
                      <button class='btn'> ${text} </button>
                    </article>
                    <article>
                      <button class='reco'> Recomendaciones </button>
                    </article>
                    <article>
                      <button class='buttonReviewsTv> Get Reviews </button>
                    </article>
      </section>`
    contenedor.innerHTML= info
    
    contenedor_recomedations.style.display = "none"
    let botonreco= document.querySelector(".reco")

    botonreco.addEventListener("click", function(){
      if (contenedor_recomedations.style.display === "none"){
        contenedor_recomedations.style.display = "flex"
      }
      else{
        contenedor_recomedations.style.display= "none"
      }
    })

    
    conteinerReviewsTv.style.display = 'none'
    let botonReviewsTv = document.querySelector('.buttonReviewsTv')

    botonReviewsTv.addEventListener('click', function(){
      if(conteinerReviewsTv.style.display === 'none'){
        conteinerReviewsTv.style.display = 'flex'
      }else{
        conteinerReviewsTv.style.display = 'none'
      }
    })

    let botonfavs = document.querySelector('.btn')
    
    botonfavs.addEventListener('click', function(e){
      let favoritos = obtenerfav()
      let elementoFav = favoritos.includes(data.id)
      if(elementoFav){
        eliminar(data.id, favoritos)
        e.target.innerText = 'Agregar a favoritos'
      }else {
        agregar(data.id, favoritos)
        e.target.innerText = 'Eliminar de favoritos'
    }
  })
  
})

.catch(function(error){
  console.log(error)
})

function obtenerfav(){
  let obtener = localStorage.getItem('favoritos2')
  //console.log(obtener)
  if(obtener !== null && obtener != undefined){
    return JSON.parse(obtener)
  }else{
    return []
  }
  }

function agregar(id, obtener){
  obtener.push(id)
  let string = JSON.stringify(obtener)
  localStorage.setItem('favoritos2', string)
}

function eliminar(id, obtener){
  let position = obtener.indexOf(id)
  obtener.splice(position, 1)
  let string2 = JSON.stringify(obtener)
  localStorage.setItem('favoritos2', string2)
}


//get recomendations
let recomedations= `
https://api.themoviedb.org/3/tv/${id}/recommendations`
fetch(recomedations+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data)
  let reco=""
  for(let i=0; i<4; i++){
    reco+=`
    <article class=articlereco>
      <h4>${data.results[i].name}</h4>
      <a href="./detalleserie.html?id=${data.results[i].id}"> <img class=imagenreco src="https://image.tmdb.org/t/p/w500/${data.results[i].backdrop_path}" alt="${data.results[i].name}" ></a>
       <nav class="navseries">
      <a class="vermás" href="./detalleserie.html?id=${data.results[i].id}" > VER MÁS </a>
      </nav>
     </article>
    `
  }
  contenedor_recomedations.innerHTML= reco
})

.catch(function(error){
  console.log(error)
})
//triller
let contenedorTriller= document.querySelector(".triller")
let contenedorMasVideos= document.querySelector(".sectionmasvideos")
let video= `https://api.themoviedb.org/3/tv/${id}/videos`
fetch(video+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data)
  vid=""
  for(let i = 0; i < 1; i++){
    vid+=`
    <article class="articlevideo">
    <h3>Ver triller: </h3>
    <iframe class=video width="560" height="315" src="https://www.youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </article>`
    if(data.results.length>2){
      vid+=`<button class="mastrillers"> Ver mas trillers</button>`
    }}
contenedorTriller.innerHTML= vid
    vidmas=""
    for(let i = 1; i < 3; i++){
      vidmas+=`
      <iframe class=videoextra  src="https://www.youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `} 
  
  contenedorMasVideos.innerHTML= vidmas
 
  let botonvideos= document.querySelector(".mastrillers")
contenedorMasVideos.style.display = "none"
botonvideos.addEventListener("click", function(){
    console.log("click")
  if (contenedorMasVideos.style.display=== "none"){
      contenedorMasVideos.style.display= "flex"
      }
  else{
      contenedorMasVideos.style.display= "none"
      }
    })
})
/*
.catch(function(error){
  console.log(error)
})


*/



// GET REVIEWS //

/*

let reviewsTv = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=0c5fb97f0c55576b638b49d73fa8d73e`

fetch(reviewsTv)
.then(function(resp){
  return resp.json()
})
.then(function(data){
  console.log(data)
  let rTv = ''
  for(i=0; i<3; i++){
    rTv += `
    <article>
      <p>${data.results[i].author}</p>
      <p>${data.results[i].content}</p>
    </article>
    `
  }
  conteinerReviewsTv.innerHTML = rTv
})
.catch(function(error){
  console.log(error)
})

*/


//CAMBIO DE COLOR EN LINKS//
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('links')){
    e.target.style.color = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('links')){
    e.target.style.color= 'white'
  }
})
//botones recomenddos, favoritos, reviews
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('btn')){
    e.target.style.backgroundColor = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('btn')){
    e.target.style.backgroundColor= '#cc5333'
  }
})
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('reco')){
    e.target.style.backgroundColor = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('reco')){
    e.target.style.backgroundColor= '#cc5333'
  }
})
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('buttonReviewsTv')){
    e.target.style.backgroundColor = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('buttonReviewsTv')){
    e.target.style.backgroundColor= '#cc5333'
  }
})
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('mastrillers')){
    e.target.style.backgroundColor = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('mastrillers')){
    e.target.style.backgroundColor= '#cc5333'
  }
})

//||e.target.classList.contains('reco')||e.target.classList.contains('buttonReviewsTv')
//boton buscar 
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('buscar')){
    e.target.style.backgroundColor = '#cc5333'
  }
})
window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('buscar')){
    e.target.style.backgroundColor = '#23074d'

    }
})