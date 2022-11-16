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
//console.log("id",id)
let detallepelis= `https://api.themoviedb.org/3/movie/${id}`
let apiKey = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';
let contenedor = document.querySelector(".contenedor")
let button = document.querySelector('.button')
let info =''
let url = 'https://api.themoviedb.org/3/movie/popular?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US&page=14'
let query = location.search
let objQuery = new URLSearchParams(query)
let idFav = objQuery.get('id')


fetch(detallepelis+apiKey)
.then(function(response){
    return response.json();
  })
.then(function(data){
    console.log(data)

        info+=` <section class="title">
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
                    <h4> GÉNEROS:</h5>
                    `
                    for (let i=0; i<data.genres.length; i++){
                    let genero= data.genres[i].name
                    let idgenero= data.genres[i].id
                    info+=(`
                        <a class="generos" href="./generos.html?id=${idgenero}"> ${genero}</a></article> `)}
                        
                  info+=`
                  <article class="article1">
                    <h4> RATING: </h5>
                    <p> rating¿? </p>
                  </article>
                  <article class="article1">
                    <h4> VER EN: </h5>
                    <p> donde¿? </p>
                    
                  </article>
                  <article class="article2">
                    <p>${data.overview}</p>
                  </article>
              
            </section>
         `
         contenedor.innerHTML= info  
  ///BOTON FAVORITOS///
  
      let favoritos = obtenerfav()
      let elementoFav = favoritos.includes(data.id)
      let text = ' '
      if (elementoFav){
        text = 'Eliminar de favoritos'
      }else{
        text = 'Agregar a favoritos'
      }
  button.innerHTML= `
  <article>
    <button class='botonfavs'> ${text} </button>
  </article>`
  
    let botonfavs = document.querySelector('.botonfavs')
    

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


  ////BOTON DE FAVORITOS/////





function obtenerfav(){
  let obtener = localStorage.getItem('favoritos')
  if(obtener != null && obtener != undefined){
    return JSON.parse(obtener)
  }else{
    return []
  }
}

function agregar(idFav, obtener){
  obtener.push(idFav)
  let string = JSON.stringify(obtener)
  localStorage.getItem('favoritos', string)
}

function eliminar(idFav, obtener){
  let position = obtener.indexOf(idFav)
  obtener.splice(position, 1)
  let string2 = JSON.stringify(obtener)
  localStorage.getItem('favoritos', string2)
}
