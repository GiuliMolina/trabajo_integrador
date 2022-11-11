
let apiKey = '?api_key=0c5fb97f0c55576b638b49d73fa8d73e';
let contenedor= document.querySelector(".section1")
let info=''
let detalle=location.search
let objDetalle= new URLSearchParams(detalle)
let id= objDetalle.get("id")
console.log("id",id)
let detallepelis= `https://api.themoviedb.org/3/movie/${id}`

fetch(detallepelis+apiKey)

.then(function(response){
    return response.json();
  })
  .then(function(data){
     console.log(data)
  })
  .catch(function(error){
      console.log(`El error es ${error}`)
  })
