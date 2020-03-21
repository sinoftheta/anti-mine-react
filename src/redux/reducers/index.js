import { combineReducers } from 'redux';

import {settings} from './settings.js';
import {board, gradientRaster} from './game.js';
import {view} from './view.js';

// COMBINE REDUCERS //
export default combineReducers({
    board,
    gradientRaster,
    settings,
    view
});