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

let detalle =location.search
let objDetalle = new URLSearchParams(detalle)
let id = objDetalle.get("id")
let detallepelis= `https://api.themoviedb.org/3/movie/${id}`
let apiKey = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';
let contenedor = document.querySelector(".contenedor")
let info =''
let contenedor_recomedations= document.querySelector(".recomendacion")
let contenedorReviews = document.querySelector('.reviews')
let contenedorTriller= document.querySelector(".triller")
//let contenedorMasTrillers= document.querySelector(".masvideos") borrar si no uso al final

//watch providers
let contenedorProviders= document.querySelector(".providers")
let providers= `https://api.themoviedb.org/3/movie/${id}/watch/providers`
fetch(providers+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(obtener)
  prov=""
  prov+=`
  <h4> DONDE VER: </h4>
  `
  for(let i=0; i<data.results.US.flatrate.length; i++){
  prov+=`
    <img class="imgprov" src="https://image.tmdb.org/t/p/w500/${data.results.US.flatrate[i].logo_path}" >`
  }  
})
.catch(function(error){
  console.log(error)
})

//codigo principal
fetch(detallepelis+apiKey)
.then(function(response){
    return response.json();
  })
.then(function(data){

        info+=`<article class="title">
                <h2>${data.original_title}</h2>
              </article>
            <section class="section1">
                <article class="imagen">
                  <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}" height="500px" width="300px">
                </article>
              <section class="section2">
                <article class="article2">
                  <h3>Sinopsis: </h3>
                  <p class='overview'>${data.overview}</p>
                </article> 
                <article class="article1">
                   <h3>Sobre ${data.original_title}: </h3>
                </article>                 
                <article class="article1">
                  <h4> ESTRENO: </h4>
                  <p> ${data.release_date}</p>
                </article>
                <article class="article1">
                  <h4> DURACIÓN: </h4>
                  <p>${data.runtime} minutos </p>
                </article>
                <article class="article1">
                  <h4> GÉNEROS:</h4>
                    `
                for (let i=0; i<data.genres.length; i++){
                  let genero= data.genres[i].name
                  let idgenero= data.genres[i].id
                  info+=(`
                        <a class="generos" href="./generos.html?id=${idgenero}"> ${genero}</a>`)}
                        
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
    let text = ''
    if (elementoFav){
      text = 'Eliminar de favoritos'
    }else{
      text = 'Agregar a favoritos'
    }
      info += `
      <section class=section1>
        <article class="article1">
          <button class='btn'> ${text} </button>
        </article>
        <article class="article1">
          <button class='reco'> Recomendado para ti </button>
        </article>
        <article>
          <button class='buttonReviews'> Get Reviews </button>
        </article>
      </section>
      `
    contenedor.innerHTML= info

    contenedor_recomedations.style.display = "none"
    let botonreco= document.querySelector(".reco")

    botonreco.addEventListener("click", function(){
      if (contenedor_recomedations.style.display === "none"){
        contenedor_recomedations.style.display= "flex"
      }
      else{
        contenedor_recomedations.style.display= "none"
      }
    })

    contenedorReviews.style.display = 'none'
    let botonReviews = document.querySelector('.buttonReviews')

    botonReviews.addEventListener('click', function(){
      if(contenedorReviews.style.display === 'none'){
        contenedorReviews.style.display = 'flex'
      }else {
        contenedorReviews.style.display = 'none'
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
        e.target.innerText = 'Eliminar de favoritos'}
  })    
  

})

.catch(function(error){
  console.log(error)})

function obtenerfav(){
  let obtener = localStorage.getItem('favoritos')
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
  localStorage.setItem('favoritos', string)
}

function eliminar(id, obtener){
  let position = obtener.indexOf(id)
  obtener.splice(position, 1)
  let string2 = JSON.stringify(obtener)
  localStorage.setItem('favoritos', string2)
}


//get recomenadtions
let recomedations= `https://api.themoviedb.org/3/movie/${id}/recommendations`
fetch(recomedations+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  let reco=""
  for(let i=0; i<4; i++){
    reco+=`
    <article class=articlereco>
      <h4>${data.results[i].original_title}</h4>
     <a href="./detallepelis.html?id=${data.results[i].id}"> <img class=imagenreco src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}" ></a>
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
let contenedorMasVideos= document.querySelector(".sectionmasvideos")

let video= `https://api.themoviedb.org/3/movie/${id}/videos`
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
.catch(function(error){
  console.log(error)
})

// GET REVIEWS //

let reviews = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=0c5fb97f0c55576b638b49d73fa8d73e`

fetch(reviews)
.then(function(resp){
  return resp.json()
})
.then(function(data){
  console.log(data)
  let r = ''
  for(i=0; i<3; i++){
    r += `
    <article>
    <p>${data.results[i].author}</p>
    <p> ${data.results[i].content}</p>
    </article>
    `
  }
  contenedorReviews.innerHTML = r
})
.catch(function(error){
  console.log(error)
})

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

//cambio en botones
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
  if(e.target.classList.contains('buttonReviews')){
    e.target.style.backgroundColor = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('buttonReviews')){
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

//cambio en boton buscar
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