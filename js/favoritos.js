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

let container = document.querySelector(".favoritos")
let favs = getStorage()
console.log(favs)
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
  }
}
function getFavs(arrayFavs){
  for(let i = 0; i<length.arrayFavs; i++){
    fetch(`https://api.themoviedb.org/3/movie/${arrayFavs[i].id}?api_key=0c5fb97f0c55576b638b49d73fa8d73e`)
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      console.log(data)
    })
    .catch(function(error){
      console.log(error)
    })
  }
}
