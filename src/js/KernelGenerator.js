export const generateKernel = (radius, type) => {
    let k = [];
    
    //let radius = Math.floor(diameter / 2);

    let diameter = 2 * radius - 1;

    if(type == 'king'){
        for(let i = 0; i < diameter; i++){
            k[i] = [];
            for(let j = 0; j < diameter; j++){

                //compute inverse  taxicab distance
                k[i][j] = Math.max(Math.abs(Math.abs(i - radius) + Math.abs( j - radius) - diameter) - radius, 0);
            }
        }
    }
    else{
        for(let i = 0; i < diameter; i++){
            k[i] = [];
            for(let j = 0; j < diameter; j++){

                //compute inverse  taxicab distance
                k[i][j] = Math.max(Math.abs(Math.abs(i - radius) + Math.abs( j - radius) - diameter) - radius, 0);
            }
        }
    }
    
    return k;
}