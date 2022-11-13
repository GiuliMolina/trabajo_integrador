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
let api = 'https://api.themoviedb.org/3/movie/popular?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US&page=1';

let multi = location.search;
let objMulti = new URLSearchParams(multi);
let keyWord = document.querySelector('pelicula')

fetch(`${api}&query=${keyWord}`)
.then(function(resp){
    return resp.jason()
})
.then(function(data){
    console.log(data)
})
.catch(function(error){
    console.log(error)
})



