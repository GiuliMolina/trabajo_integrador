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

let detalle=location.search
let objDetalle= new URLSearchParams(detalle)
let id= objDetalle.get("id")
//console.log("id",id)
let detallepelis= `https://api.themoviedb.org/3/movie/${id}`
let apiKey = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';
let contenedor= document.querySelector(".contenedor")

let info=''
fetch(detallepelis+apiKey)

.then(function(response){
    return response.json();
  })
  .then(function(data){
        console.log(data)
        info+=` <section class="title">
                <h2>${data.original_title}</h2>
                </section>
            <section class="imagen">
                <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}" height="500px" width="300px">
            </section>
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
                    <a class="generos" href="./generos.html?id=${idgenero}"> ${genero}</a>
                </article>
                `)
                }
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
  })
  .catch(function(error){
      console.log(`El error es ${error}`)
  })
