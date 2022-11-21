//buscador 
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


let keyApi = '0c5fb97f0c55576b638b49d73fa8d73e';
let populares = 'https://api.themoviedb.org/3/movie/popular?api_key=';
let contenedor = document.querySelector('.section1')
let info = ''

fetch(populares+ keyApi)
.then(function(response){
  return response.json();
})
.then(function(data){
    console.log(data)
    for(let i=0; i<5; i++){
      info +=`
      <section class='section1'>
        <article>
          <h5><a class= 'titulopeli' href="./detallepelis.html?id=${data.results[i].id}"> ${data.results[i].original_title} </a></h5>
          <a class= 'titulopeli' href="./detallepelis.html?id=${data.results[i].id}"><img class='imagehome' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}"></a>
          <p><a class = 'textopeli' href="./detallepelis.html?id=${data.results[i].id}">${data.results[i].release_date}</a></p>
          <nav class="navseries">
            <a class="vermás" href="./detallepelis.html?id=${data.results[i].id}" > VER MÁS </a> 
          </nav> 
        </article>
      </section>
      `//ESTE VER MÁS PUEDE TENER OTRA FUNCIONALIDAD//

    }
    contenedor.innerHTML = info

})
.catch(function(error){
    console.log(`El error es ${error}`)
})



let recomendados = 'https://api.themoviedb.org/3/tv/popular?api_key=';
let contenedor2 = document.querySelector('.section2');
let info2 = '';

fetch(recomendados + keyApi)
.then(function(response){
  return response.json();
})
.then(function(data){
    console.log(data)
    for(let i=0; i<5; i++){
      info2 +=`
      <section class='section2'>
        <article>
          <h5> <a class='tituloseries' href="./detalleserie.html?id=${data.results[i].id}"> ${data.results[i].name} </a></h5>
          <a class='tituloseries' href="./detalleserie.html?id=${data.results[i].id}"><img class='imagehome' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}"></a>
          <p> <a class='textoseries' href="./detalleserie.html?id=${data.results[i].id}" >${data.results[i].first_air_date}</a> </p>
          <nav class="navseries">
            <a class="vermás" href="./detalleserie.html?id=${data.results[i].id}" > VER MÁS </a>
          </nav>
        </article>
      </section>
      `
    }
    contenedor2.innerHTML = info2
    
})
.catch(function(error){
    console.log(`El error es ${error}`)
})

let nuevas = 'https://api.themoviedb.org/3/movie/upcoming?api_key=';
let contenedor3 = document.querySelector('.section3');
let info3 = '';

fetch(nuevas + keyApi)
.then(function(response){
  return response.json();
})
.then(function(data){
    console.log(data)
    for(let i=0; i<5; i++){
      info3 +=`
      <section class='section3'>
        <article>
          <h5><a class="titulopeli" href="./detallepelis.html?id=${data.results[i].id}" > ${data.results[i].original_title} </a></h5>
          <a class="titulopeli" href="./detallepelis.html?id=${data.results[i].id}" ><img class='imagehome' src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}" ></a>
          <p> <a class="textopeli" href="./detallepelis.html?id=${data.results[i].id}" >${data.results[i].release_date}</a></p>
          <nav class="navseries">
            <a class="vermás" href="./detallepelis.html?id=${data.results[i].id}" > VER MÁS </a>
          </nav>
        </article>
      </section>
      `
    }
    contenedor3.innerHTML = info3

   
})
.catch(function(error){
    console.log(`El error es ${error}`)
})

//CAMBIO DE COLOR EN LINKS//
window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('links')){
    e.target.style.color = 'purple'
  }
})

window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('links')){
    e.target.style.color= 'white'
  }
})

//AGRANDAR IMAGEN//

window.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('imagehome')){
    e.target.style.width = '115%'
  }
})
window.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('imagehome')){
    e.target.style.width = '105%'
  }
})