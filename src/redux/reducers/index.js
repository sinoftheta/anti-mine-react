import { combineReducers } from 'redux';

import {logicSettings, generalSettings} from './settings.js';
import {board, gradientRaster, cutoff, multiplier, hitpoints, remainingMines} from './game.js';
import {view} from './view.js';

// COMBINE REDUCERS //
export default combineReducers({
    board,
    gradientRaster,
    cutoff,
    multiplier,
    hitpoints,
    remainingMines,
    
    logicSettings, 
    generalSettings,
    view
});