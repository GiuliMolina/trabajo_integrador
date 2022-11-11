
let buscador = 'https://api.themoviedb.org/3/movie/popular?api_key=0c5fb97f0c55576b638b49d73fa8d73e&language=en-US&page=1'
let form = document.querySelector('.busquedor')

fetch(buscador)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
    
})
.catch(function(error){
    console.log(`El error es ${error}`)
})

