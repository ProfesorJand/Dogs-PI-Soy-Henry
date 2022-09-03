export const GET_RAZAS = "GET_RAZAS";
// export const REMOVE_MOVIE_FAVORITE = "REMOVE_MOVIE_FAVORITE";
// export const GET_MOVIES = "GET_MOVIES";
// export const GET_MOVIES_DETAILS = "GET_MOVIES_DETAILS";
// export const CLEAR_DETAIL = "CLEAR_DETAIL";

// const apiKey = "a92cb965";

 export function getRazas() { 
    return function(dispatch){
        return fetch("https://api.thedogapi.com/v1/breeds?api_key=live_jWWAc9OEAMVZDuQ8Dqb6I2IgWntSyCFi8SIlcb1wB8AfwJm5XmzNYXshz3DHpfVr") //http://localhost:3001/dogs
        .then(r=>r.json())
        .then(json => dispatch({type: GET_RAZAS, payload: json}))
    }
}

// // otra para eliminarla de favoritas removeMovieFavorite.  
// export function removeMovieFavorite(payload) { // o por id o algun dato para eliminarlo
//     return { type: REMOVE_MOVIE_FAVORITE, payload };
// }

// export function clearDetail(){
//     return {type: CLEAR_DETAIL}
// }
  
// export function getMovies(titulo) { // por titulo
// return function(dispatch) {
//     return fetch("http://www.omdbapi.com/?apikey="+ apiKey + "&s=" + titulo)
//     .then(response => response.json())
//     .then(json => {
//         dispatch({ type: GET_MOVIES, payload: json });
//     });
// };
// }

// // otra para traer los detalles de la pelicula especifica getMovieDetail
// export function getMovieDetail(id){ // por id
// return function(dispatch) {
//     return fetch("http://www.omdbapi.com/?apikey="+ apiKey + "&i=" + id)
//         .then(response => response.json())
//         .then(json => {
//         dispatch({ type: GET_MOVIES_DETAILS, payload: json });
//         });
//     };
// }