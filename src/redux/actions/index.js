import {rasterizeGradient} from '../../js/ColorMap.js';


export const updateSettings = (newSetting) => ({ type: 'CHANGE_SETTINGS', setting: newSetting});

export const changeToView = (view) => ({ type: 'CHANGE_VIEW', view: view});


export const setBoardRender = (board) => ({ type: 'UPDATE_BOARD', board: board});

export const loadRaster = (gradient) => {
    return (dispatch, getState)=> {
        let raster = rasterizeGradient(getState().settings.gradient);
        dispatch({type: 'SET_RASTER', raster: raster});
    }
}

