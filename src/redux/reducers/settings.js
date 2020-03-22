import {initGenSettings, initLogicSettings} from './../../data/DefaultSettings.js';

export const logicSettings = (state = initLogicSettings , action) => {
    switch(action.type){
        case 'CHANGE_LOGIC_SETTINGS':
            return { ...state,  ...(action.setting) }; // action type gets caught in settings obj
        default:
            return state;
    }
}

export const generalSettings = (state = initGenSettings , action) => {
    switch(action.type){
        case 'CHANGE_GENERAL_SETTINGS':
            return { ...state,  ...(action.setting) };
        default:
            return state;
    }
}