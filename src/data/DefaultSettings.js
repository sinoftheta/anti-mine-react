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
    kernelTypeId: 1, //0: taxi, 1: king
    kernelCenter: 12,
    showTileValues: true,

}

export const kernelTypes = ['taxi','king'];