import { combineReducers } from 'redux';

import {logicSettings, generalSettings} from './settings.js';
import {board, gradientRaster, cutoff, multiplier} from './game.js';
import {view} from './view.js';

// COMBINE REDUCERS //
export default combineReducers({
    board,
    gradientRaster,
    cutoff,
    multiplier,

    
    logicSettings, 
    generalSettings,
    view
});