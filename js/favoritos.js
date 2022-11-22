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

let container= document.querySelector(".favoritos")
let favs= getStorage()
let favs2= getStorage2()
let info= ""
if (favs.length==0 && favs2.length==0){
    container.innerHTML= `
    <li>
      <h3>No tienes favoritos</h3>
    </li>
    `}
else{
  getFavspelis(favs)
  getFavsSeries(favs2)
}

function getStorage(){
  let storage= localStorage.getItem("favoritos")
  if (storage != null && storage!== undefined){
    return JSON.parse(storage)
  }
  else{
    return []
  }}
function getStorage2(){
  let storage2= localStorage.getItem("favoritos2")
  if (storage2 != null && storage2!== undefined){
    return JSON.parse(storage2)
  }
  else{
    return []
  }
}
function getFavspelis(arrayFavsPeli){
  for(let i = 0; i<arrayFavsPeli.length; i++){
    fetch(`https://api.themoviedb.org/3/movie/${arrayFavsPeli[i]}?api_key=0c5fb97f0c55576b638b49d73fa8d73e`)
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      console.log(data)
      container.innerHTML+=
      `
      <article class="favs" >
        <h5> ${data.original_title}" </h5>
        <a href="./detallepelis.html?id=${data.id}">
        <img class=imagenes src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}" >
        </a>
  
      </article>`
  
    })
    .catch(function(error){
      console.log(error)
    })
    
  }
}

function getFavsSeries(arrayFavsserie){
  for(let i = 0; i<arrayFavsserie.length; i++){
    fetch(`https://api.themoviedb.org/3/tv/${arrayFavsserie[i]}?api_key=0c5fb97f0c55576b638b49d73fa8d73e`)
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      console.log(data)
      container.innerHTML+=
      `
      <article class="favs" >
        <h5> ${data.name}" </h5>
        <a href="./detalleserie.html?id=${data.id}">
        <img class= 'imagenes' src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.name}" >
        </a>
      </article>`
  
    })
    .catch(function(error){
      console.log(error)
    })
  }
}

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

//AGRANDAR IMAGEN//

window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('imagenes')){
    e.target.style.width = '56%'
  }
})
window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('imagenes')){
    e.target.style.width = '50%'
  }
})
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