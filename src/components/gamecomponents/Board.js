// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {colorMap} from '../../js/ColorMap.js';



function animationTimings(x, y, width, height/*, centerFirst*/){
    // calculate when and how fast to animate in
    // tiles more central to the board will enter FIRST (or last, depending on centerFirst)

    // total animation length in ms (duration + delay = totalDuration)
    const totalDuration = 500;

    const deviation = 0.35;
    
    let delay = Math.min(totalDuration, Math.floor( // cap value at totalDuration & floor

                ((((Math.random() * 2 - 1) * deviation) + 1 ) // rand in [-dev, dev] + 1
                *
                Math.sqrt(Math.pow((x - width / 2 ), 2) + Math.pow((y - height / 2), 2))) // distance of tile from center
                /
                Math.max(width, height) // normalize by radius of field
                *
                totalDuration)) //multiply by totalDuration
                ;

    return {delay: delay, duration: totalDuration - delay};
}


const randTransformDir = () => {
    // `translateY( -1.5 * calc(vars(----cell-size) * ${h}))`,

    const vals = [
        `translateX(100vw)`,
        `translateX(-100vw)`,
        `translateY(100vh)`,
        `translateY(-100vh)`,
    ];
    return vals[Math.floor(Math.random() * 4)];
}


import './Board.css';
// antiMine will be reset by its parent component when its settings prop changes
class Board extends Component{
    constructor(props){
        super(props);

        this.state={
            anim: false,
        }
    }
    shouldComponentUpdate(){
        console.log('board deciding to update!')
        return true;
    }
    render(){

        

        console.log("BOARD RENDERING")
        //console.log(this.props.raster);
        //console.log(this.props.board)
        //console.log(this.props.renderUncovered)

        let tiles = this.props.board.map((row, i) =>
            <div id={"__GAME__row-" + i} className={'__GAME__row'} key={i}>
                {row.map((tile, j) =>{
                    let n = colorMap(
                                    tile.value,
                                    this.props.kernelWeight,
                                    this.props.cutoff,
                                    this.props.multiplier)
                    //manually adjust color for mines
                    if(tile.isMine && tile.value > 0) n = Math.min( n + 15, 99 );

                    if(tile.isMine && tile.value < 0) n = Math.max( n - 15, 0 );

                    //console.log(n)
                    //console.log(this.props.raster[n])

                    let timings = animationTimings(i,j,this.props.board.length, this.props.board[0].length);
                    
                    
                    return (
                        
                        <div 
                            className={
                                '__GAME__tile ' + 
                                (tile.revealed || this.props.renderUncovered ? 
                                '__GAME__tile-revealed ' 
                                : 
                                '__GAME__tile-covered ')
                                /*+
                                (!this.props.animateIn ?
                                `__GAME__tile-animate-in`
                                :
                                ''
                                )*/

                            }
                            key={j}
                            x={tile.x}
                            y={tile.y}
                            style={{
                                //tile background
                                ...tile.revealed || this.props.renderUncovered ? {background:this.props.raster[n], borderColor:this.props.raster[n] } : {},

                                //text color if mine
                                ...tile.isMine ? {color: '#F23B5D' } : {},

                                // WORKS, BUT NEEDS TO ONLY BE ACTIVE WHILE ANIMATING
                                //animation properties
                                transitionDelay: timings.delay + 'ms',
                                transitionDuration: timings.duration + 'ms',
                                transform: this.state.anim ? randTransformDir() : null,
                            }}
                            onClick={() => this.props.click(tile.x, tile.y)}
                        >
                            {this.props.showTileValues && 
                            ( tile.revealed || this.props.renderUncovered ) && 
                            !(tile.value == 0 && !tile.isMine)
                            
                            ? tile.value : null}
                            
                        </div>
                )})}
                </div>

                
            );
            return (
            <>
            <div id={'__GAME__board'}>
                {tiles}
            </div>
            <button
            onClick={() => this.setState(p => ({anim: !p.anim}))}
            >fuck</button>
            </>
        );
    }
}


const mapStateToProps = state => ({
    board: state.board,
    kernelWeight: state.logicSettings.kernelWeight,
    raster: state.gradientRaster,
    showTileValues: state.generalSettings.showTileValues,

    cutoff: state.cutoff,
    multiplier: state.multiplier,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Board);