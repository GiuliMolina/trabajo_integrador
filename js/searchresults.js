let sT = location.search
let QsT = new URLSearchParams(sT)
let buscado = QsT.get('busquedor')
//let id= QsT.get("id")
console.log(QsT)
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
let UrlSearch = 'https://api.themoviedb.org/3/search/multi'
let apiKey="?api_key=0c5fb97f0c55576b638b49d73fa8d73e"
let query= `&query=${buscado}`
fetch(UrlSearch+apiKey+query)
.then(function(res){
  return res.json()
})
.then(function(data){
  console.log(data.results[0].id)
  let result = document.querySelector('.resultados1')
  let search = document.querySelector('.resultados')

  if (data.lenght == 0){
    result.innerHTML = `No se han encontrados resultados de: ${buscado}`
  }else{
    result.innerHTML = `Resultado de busqueda de: ${buscado}`
  }

  for (let i = 0 ; i < 5 ; i++){
    search.innerHTML += `
        <article class ="article">
          <a class= 'titulopeli' href="./detallepelis.html?id=${data.results[i].id}"><h5 class='titlesearch'> ${data.results[i].original_title}</h5>
          <img class="imgsearch" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}">
          <p>${data.results[i].release_date}</p></a>
          <nav class="navseries">
            <a class="vermás" href="./detallepelis.html?id=${data.results[i].id}" > VER MÁS </a> 
          </nav> 
        </article>`
  }

})

.then(function(error){
  console.log('El error es' + error)
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
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('titlesearch')){
    e.target.style.color = '#23074d'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('titlesearch')){
    e.target.style.color= 'white'
  }
})

//AGRANDAR IMAGEN//

window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('imgsearch')){
    e.target.style.width = '105%'
  }
})
window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('imgsearch')){
    e.target.style.width = '95%'
  }
})
