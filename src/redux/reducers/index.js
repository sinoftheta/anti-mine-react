import { combineReducers } from 'redux';

import {logicSettings, generalSettings} from './settings.js';
import {board, gradientRaster} from './game.js';
import {view} from './view.js';

// COMBINE REDUCERS //
export default combineReducers({
    board,
    gradientRaster,
    logicSettings, 
    generalSettings,
    view
});