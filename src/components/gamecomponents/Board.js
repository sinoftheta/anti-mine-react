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
    render(){
        let tiles = this.props.board.map((row, i) =>
            <div id={"__GAME__row-" + i} className={'__GAME__row'} key={i}>
                {
                    row.map((tile, j) =>
                        <div 
                            className={
                                '__GAME__tile' + 
                                (tile.revealed ? 
                                ' __GAME__tile-revealed' 
                                : 
                                ' __GAME__tile-covered')
                            }
                            key={j}
                            x={tile.x}
                            y={tile.y}
                            style={
                                
                                tile.revealed? 
                                {background: this.props.raster[colorMap(
                                    tile.value,
                                    this.props.logicSettings.kernelWeight,
                                    this.props.cutoff,
                                    this.props.multiplier)]
                                }
                                :
                                {}
                            }
                            
                            onClick={() => this.props.click(tile.x, tile.y)}
                        />
                    )
                }
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
    logicSettings: state.logicSettings,
    raster: state.gradientRaster,
    
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Board);