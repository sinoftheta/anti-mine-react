// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HPBar extends Component{
    render(){
        console.log(this.props.hp)
        return(
            <div id={'__GAME__hp-bar-container'}>
                <div id={'__GAME__hp-bar-animated'}/>
                {this.props.showTileValues?
                <div id={'__GAME__hp-bar-text'}>
                    {this.props.hp}
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