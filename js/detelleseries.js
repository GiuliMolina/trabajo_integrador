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
let apiKey = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';
let contenedor = document.querySelector(".contenedor")
let contenedor_recomedations= document.querySelector(".recomendacion")
let contenedorProviders= document.querySelector(".providers")
let conteinerReviewsTv = document.querySelector('.reviews')
//let button = document.querySelector('.button')
let info =''


fetch(detalleseries+apiKey)
.then(function(response){
    return response.json();
  })
.then(function(data){
    console.log(data)

        info+=` <article class="title">
                    <h2>${data.name}</h2>
                  </article>
                  <article class="imagen">
                  <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}" height="500px" width="300px">
                  </article>
                  <section class="section1">
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
                        <a class="generos" href="./generos.html?id=${idgenero}"> ${genero}</a></article> `)}
                        
                  info+=`
                  <article class="article1">
                    <h4> RATING: </h4>
                    <p> ${data.vote_average}</p>
                  </article>
                  </section>
                  <section class="overview">
                  <article class="article2">
                    <p>${data.overview}</p>
                  </article>
                  </section>
            
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
                    <button class='bottonReviews'> Get Reviews </button>
                    </article>
      </section>`
contenedor.innerHTML= info
contenedor_recomedations.style.display = "none"
    let botonreco= document.querySelector(".reco")
    botonreco.addEventListener("click", function(){
      if (contenedor_recomedations.style.display=== "none"){
        contenedor_recomedations.style.display= "flex"
      }
      else{
        contenedor_recomedations.style.display= "none"
      }
    })

  let bottonReviews = document.querySelector('.bottonReviews')
  conteinerReviewsTv.style.display = 'none'
  bottonReviews.addEventListener('click', function(){
    
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



//watch providers
let providers= `https://api.themoviedb.org/3/tv/${id}/watch/providers`
fetch(providers+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data.results)
  prov=""
  prov+=`
  <article class="article1">
  <h4> DONDE VER: </h4>
  `
  for(let i=0; i<data.results.US.flatrate.length; i++){
  prov+=`
    <img class="imgprov" src="https://image.tmdb.org/t/p/w500/${data.results.US.flatrate[i].logo_path}" >
  </article> 
  `}
  contenedorProviders.innerHTML= prov
})


.catch(function(error){
  console.log(error)
})


// get reviews//
let reviews = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=0c5fb97f0c55576b638b49d73fa8d73e`

fetch(reviews)
.then(function(resp){
  return resp.json()
})
.then(function(data){
  console.log(data)
  /*let rseries = ''
  for(let i=0; i<3; i++){
  
   rseries += `
   <article>
   <p> ${data.results[i].author}</p>
   <p> ${data.results[i].content}</p>
   </article>
   `
  }
  conteinerReviewsTv.innerHTML = rseries*/

  
})
.catch(function(error){
  console.log(error)
})
