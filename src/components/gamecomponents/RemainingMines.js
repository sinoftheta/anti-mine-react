// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RemainingMines extends Component{
    render(){
        return(
            <div id={'__GAME__remaining-mines'}>
                {this.props.remainingMines}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    remainingMines: state.remainingMines,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RemainingMines);