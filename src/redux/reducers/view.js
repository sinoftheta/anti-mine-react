export const view = (state = 'title' , action) => {
    switch(action.type){
        case 'CHANGE_VIEW':
            return action.view;
        default:
            return state;
    }
}