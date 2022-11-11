//busquedor 

//let pelis =  'https://api.themoviedb.org/3/movie/{movie_id}?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US'
//let series = 'https://api.themoviedb.org/3/tv/{tv_id}?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US'
//let form = document.querySelector('.busquedor')

//fetch(pelis)
//.then(function(response){
  //  return response.json();
//})
//.then(function(data){
  //  console.log(data)
//})
//.catch(function(error){
  //  console.log(`El error es ${error}`)
//})

//fetch(series)
//.then(function(response){
  //  return response.json();
//})
//.then(function(data){
  //  console.log(data)
//})
//.catch(function(error){
  //  console.log(`El error es ${error}`)
//})

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
          <h5> ${data.results[i].original_title}</h5>
          <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}" height="300px">
          <p>${data.results[i].release_date}</p>
          <nav class="navseries">
            <a class="vermás" href="./detalleserie.html" > VER MÁS </a>
          </nav>
        </article>
      </section>
      `
    }
    contenedor.innerHTML = info
})
.catch(function(error){
    console.log(`El error es ${error}`)
})

let recomendados = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
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
          <h5> ${data.results[i].original_title}</h5>
          <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}" height="300px">
          <p>${data.results[i].release_date}</p>
          <nav class="navseries">
            <a class="vermás" href="./detalleserie.html" > VER MÁS </a>
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
          <h5> ${data.results[i].original_title}</h5>
          <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="${data.results[i].original_title}" height="300px">
          <p>${data.results[i].release_date}</p>
          <nav class="navseries">
            <a class="vermás" href="./detalleserie.html" > VER MÁS </a>
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
