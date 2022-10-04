import {GET_BRED_FOR} from '../actions';

const initialState = {
    bred_for: []
  };

function rootReducer(state = initialState, action) {
    if (action.type === GET_BRED_FOR) {
        return {
            ...state,
            bred_for: action.payload
        };
    }

    return state;
}

export default rootReducer;