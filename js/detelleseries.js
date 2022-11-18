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
                  <article class="article2">
                    <p>${data.overview}</p>
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
      info += `
                    <article>
                      <button class='btn'> ${text} </button>
                    </article> 
      </section>`
contenedor.innerHTML= info

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
  localStorage.getItem('favoritos2', string2)
}

//watch providers
let providers= `https://api.themoviedb.org/3/tv/${id}/watch/providers`
fetch(providers+apiKey)
.then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data.results)

})
.catch(function(error){
  console.log(error)
})

