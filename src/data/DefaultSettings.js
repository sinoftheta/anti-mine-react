export const initLogicSettings = {
    // PROPERTIES -- primitive data type options
    numMines: 5, //total number of mines & anti-mines
    rows: 10,
    columns: 10,
    kernelWeight: 1,
    seed: Math.floor(Math.random() * 100),
    haveAntiMines:  true,

    //DATA PROPERTIES -- properties that are data objects
    kernel: [[1]],
    presetBoard: false,//[[]], // OPTIONAL

}

export const initGenSettings = {
    themeId: 0,
    raster: [],
    level: 0,
    kernelTypeId: 0,
    kernelCenter: 2,

}

export const kernelTypes = ['taxi','king'];