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
console.log(favs)
console.log(favs2)
if (favs.length==0){
    container.innerHTML= `
    <li>
      <h3>No tienes favoritos</h3>
    </li>
    `}
else{
  getFavs(favs)
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
  if (storage2 != null && storage!== undefined){
    return JSON.parse(storage2)
  }
  else{
    return []
  }
}
function getFavs(arrayFavs){
  for(let i = 0; i<arrayFavs.length; i++){
    fetch(`https://api.themoviedb.org/3/movie/${arrayFavs[i]}?api_key=0c5fb97f0c55576b638b49d73fa8d73e`)
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      `
      <article class="favs" ></article>`
  
    })
    .catch(function(error){
      console.log(error)
    })
  }
}
