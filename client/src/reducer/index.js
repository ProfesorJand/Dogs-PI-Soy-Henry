import {GET_RAZAS} from '../actions';
//modificar arriba con las actions const



const initialState = {
    // moviesFavourites: [],
    // moviesLoaded: [],
    // movieDetail: {}
    dogsLoaded: []
  };

function rootReducer(state = initialState, action) {
    if (action.type === GET_RAZAS) {
        return {
            ...state,
            dogsLoaded: action.payload
        };
    }

    // if (action.type === ADD_MOVIE_FAVORITE) {
    //     return {
    //         ...state,
    //         moviesFavourites: state.moviesFavourites.concat(action.payload)
    //     }
    // }

    // if (action.type === REMOVE_MOVIE_FAVORITE) {
    //     return {
    //         ...state,
    //         moviesFavourites: state.moviesFavourites.filter(e => e.Title !== action.payload)
    //     };
    // }

    

    // if (action.type === GET_MOVIES_DETAILS) {
    //     return {
    //         ...state,
    //         movieDetail: action.payload
    //     };
    // }
    // if (action.type === CLEAR_DETAIL) {
    //     return {
    //         ...state,
    //         movieDetail: {}
    //     };
    // }
    

    
    return state;
}

export default rootReducer;