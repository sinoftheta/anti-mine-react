const initSettings = {
    // PROPERTIES -- primitive data type options
    numMines: 3, //total number of mines & anti-mines
    rows: 3,
    columns: 3,
    kernelWeight: 1,
    seed: 1,
    haveAntiMines:  true,

    //DATA PROPERTIES -- properties that are data objects
    kernel: [[1,1,1],[1,1,1],[1,1,1]],
    presetBoard: false//[[]], // OPTIONAL
}
export const settings = (state = initSettings , action) => {
    switch(action.type){
        case 'CHANGE_SETTINGS':
            return { ...state,  ...(action.setting) }; // action type gets caught in settings obj
        default:
            return state;
    }
}