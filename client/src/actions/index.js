export const GET_BRED_FOR = "GET_BRED_FOR";

export function getBredFor() { 
    return function(dispatch){
        return fetch(`http://localhost:3001/bred_for`)
        .then(r=>r.json())
        .then(json => dispatch({type: GET_BRED_FOR, payload: json}))
    }
}
