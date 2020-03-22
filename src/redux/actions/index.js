import {rasterizeGradient} from '../../js/ColorMap.js';
import {generateKernel} from '../../js/KernelGenerator.js';
import themes from '../../data/ColorSchemes.js'


export const updateLogicSettings = (newSetting) => ({ type: 'CHANGE_LOGIC_SETTINGS', setting: newSetting});

export const updateGenSettings = (newSetting) => ({ type: 'CHANGE_GENERAL_SETTINGS', setting: newSetting});

export const changeToView = (view) => ({ type: 'CHANGE_VIEW', view: view});


export const setBoardRender = (board) => ({ type: 'UPDATE_BOARD', board: board});



export const deriveData = () => {
    return (dispatch, getState)=> {

        console.log(themes[getState().generalSettings.themeId]);

        //raster the current theme
        let raster = rasterizeGradient(themes[getState().generalSettings.themeId].data);
        dispatch({type: 'SET_RASTER', raster: raster});


        //generate kernel
        let kernel = generateKernel(getState().generalSettings.kernelCenter, getState().generalSettings.kernelType);
        dispatch({type: 'CHANGE_LOGIC_SETTINGS', setting: {kernel: kernel, kernelWeight: 1}});
    }
}


/*
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
*/
