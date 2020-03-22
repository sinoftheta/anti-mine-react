const initLogicSettings = {
    // PROPERTIES -- primitive data type options
    numMines: 5, //total number of mines & anti-mines
    rows: 10,
    columns: 10,
    kernelWeight: 1,
    seed: Math.floor(Math.random() * 100),
    haveAntiMines:  true,

    //DATA PROPERTIES -- properties that are data objects
    kernel: [[1]],
    presetBoard: false//[[]], // OPTIONAL

}
export const logicSettings = (state = initLogicSettings , action) => {
    switch(action.type){
        case 'CHANGE_LOGIC_SETTINGS':
            return { ...state,  ...(action.setting) }; // action type gets caught in settings obj
        default:
            return state;
    }
}


const initGenSettings = {

    gradient: [
        {weight: 100, r: 255, g: 255, b: 255,},
        {weight: 50,  r: 235,  g: 69,  b: 19,},
        {weight: 0,   r: 12,  g: 0,  b: 0,},
    ],
    raster: [],
    level: 0,
    kernelType: 'king', //other option is taxi
    kernelCenter: 2,

}

export const generalSettings = (state = initGenSettings , action) => {
    switch(action.type){
        case 'CHANGE_GENERAL_SETTINGS':
            return { ...state,  ...(action.setting) };
        default:
            return state;
    }
}