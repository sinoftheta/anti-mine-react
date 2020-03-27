// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './HPBar.css';

class HPBar extends Component{
    render(){
        console.log(this.props.hp)
        return(
            <div id={'__GAME__hp-bar-container'}>

                <div 
                    id={'__GAME__hp-bar-animated'}
                    style={{height: `${Math.max(Math.floor( 100 * this.props.hp / this.props.initHP ), 0)}%`}}
                />

                {this.props.showTileValues?
                <div id={'__GAME__hp-bar-text'}>
                    {Math.max(this.props.hp, 0)}
                </div>
                :null}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    hp: state.hitpoints,
    showTileValues: state.generalSettings.showTileValues,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HPBar);