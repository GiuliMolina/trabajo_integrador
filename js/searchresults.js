let pelis =  'https://api.themoviedb.org/3/movie/{movie_id}?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US'
let series = 'https://api.themoviedb.org/3/tv/{tv_id}?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US'
let form = document.querySelector('.busquedor')

fetch(pelis)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
    let resultados = data.results
    console.log(results)
})
.catch(function(error){
    console.log(`El error es ${error}`)
})

fetch(series)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
})
.catch(function(error){
    console.log(`El error es ${error}`)
})
