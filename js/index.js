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

let keyApi = '0c5fb97f0c55576b638b49d73fa8d73e'
let populares = 'https://api.themoviedb.org/3/movie/popular?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US&page=1'

fetch(populares)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
    for(i==0; i<5; i++){}
})
.catch(function(error){
    console.log(`El error es ${error}`)
})
