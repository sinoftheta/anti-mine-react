import { combineReducers } from 'redux';

const example_reducer = (state = 0, action) => {
    switch(action.type){
        case 'EXAMPLE_SIGNAL':
            return state + 1;
        default:
            return state;
    }
}

// COMBINE REDUCERS //
export default combineReducers({
    example_reducer
});