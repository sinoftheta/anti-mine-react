export const board = (state = [[]], action) => {
    switch(action.type){
        case 'UPDATE_BOARD':
            //console.log('update board reducer...')
            //console.log(action.board == state)
            //force create new board object, concat with empty array
            return action.board.concat([]);
        default:
            return state;
    }
}

export const gradientRaster =(state = [], action) => {
    switch(action.type){
        case 'SET_RASTER':
            return action.raster;
        default:
            return state;
    }
}