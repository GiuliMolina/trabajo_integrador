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

let endpoint = 'https://api.themoviedb.org/3/discover/movie?api_key=0c5fb97f0c55576b638b49d73fa8d73e'
let detalleGenero = location.search
let objDetalleGenero = new URLSearchParams(detalleGenero)
let id = objDetalleGenero.get('id')
let conteiner = document.querySelector('.sectionpelis')
let genero = ''

fetch(`${endpoint}&with_genres=${id}`)
.then(function(resp){
  return resp.json()
})
.then(function(data){
  console.log(data)

  genero += `
  <h3>Películas de ${data.id}</h3>

  `
conteiner.innerHTML = genero
})
.catch(function(error){
  console.log(error)
})

