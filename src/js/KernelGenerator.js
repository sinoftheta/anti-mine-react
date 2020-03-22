//import {kernelTypes} from '../data/DefaultSetting.js';

export const generateKernel = (center, type) => {

    console.log('center: ' + center);
    console.log('type: ' + type);

    let k = [];
    
    let diameter = 2 * center - 1;
    console.log('diameter: ' + diameter)

    let radius = center - 1;
    console.log('radius: ' + radius);

    if(type == 0){ //taxi
        for(let i = 0; i < diameter; i++){
            k[i] = [];
            for(let j = 0; j < diameter; j++){

                //compute inverse  taxicab distance
                k[i][j] = Math.max(Math.abs(Math.abs(i - radius) + Math.abs( j - radius) - diameter) - radius, 0);
            }
        }
    }
    else if (type == 1){ //king
        for(let i = 0; i < diameter; i++){
            k[i] = [];
            for(let j = 0; j < diameter; j++){

                //compute king distance
                k[i][j] = 1 + radius - Math.max(Math.abs(i - radius), Math.abs(j - radius));
            }
        }
    }
    console.log(k)
    return k;
}