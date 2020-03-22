import {rasterizeGradient} from '../../js/ColorMap.js';
import {generateKernel} from '../../js/KernelGenerator.js';


export const updateLogicSettings = (newSetting) => ({ type: 'CHANGE_LOGIC_SETTINGS', setting: newSetting});

export const updateGenSettings = (newSetting) => ({ type: 'CHANGE_GENERAL_SETTINGS', setting: newSetting});

export const changeToView = (view) => ({ type: 'CHANGE_VIEW', view: view});


export const setBoardRender = (board) => ({ type: 'UPDATE_BOARD', board: board});

// derive data from settings
export const loadRaster = () => {
    return (dispatch, getState)=> {
        let raster = rasterizeGradient(getState().generalSettings.gradient);
        dispatch({type: 'SET_RASTER', raster: raster});
    }
}

export const loadKernel = () => {
    return (dispatch, getState)=> {
        let kernel = generateKernel(getState().generalSettings.kernelCenter, getState().generalSettings.kernelType);
        dispatch({type: 'CHANGE_LOGIC_SETTINGS', setting: {kernel: kernel, kernelWeight: 1}});
    }
}

