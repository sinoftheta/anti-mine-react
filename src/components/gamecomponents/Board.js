// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {colorMap} from '../../js/ColorMap.js';
// antiMine will be reset by its parent component when its settings prop changes
class Board extends Component{
    constructor(props){
        super(props);
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
                    
                    return (
                        <div 
                            className={
                                '__GAME__tile' + 
                                (tile.revealed || this.props.renderUncovered ? 
                                ' __GAME__tile-revealed' 
                                : 
                                ' __GAME__tile-covered')
                            }
                            key={j}
                            x={tile.x}
                            y={tile.y}
                            style={{
                                ...tile.revealed || this.props.renderUncovered ? {background:this.props.raster[n]} : {},
                                ...tile.isMine ? {color: '#F23B5D' } : {}
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
            <div id={'__GAME__board'}>
                {tiles}
            </div>
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