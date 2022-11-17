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

let generos = "https://api.themoviedb.org/3/genre/movie/list?api_key="
let keyApi = '0c5fb97f0c55576b638b49d73fa8d73e'
let contenedor = document.querySelector('.generos1')
let info = ''

fetch(generos+keyApi)
.then(function(response){
    return response.json()
})
.then(function(data){
  console.log(data)
    let info = data.genres;
    let lista = ``
    for (let i = 0; i<12; i++){
    lista += `
    <section class = "generos1">
        <a class="container" href="./detallegeneros1.html?id=${data.genres[i].id}">
            <h5>${info[i].name}</h5>
            <img src="./img/home/sobrenatural.jpg" alt="Sobrenatural" height="300px" width="400px">
        </a>
        
    </section>`
    
    }
    contenedor.innerHTML = lista
    console.log(lista)
    console.log(data)

})
.catch(function(error){
    console.log(error)
})

/*function getGenreId(){
  let idGenre = `${data.genres[i].id}`
  return idGenre
}*/
