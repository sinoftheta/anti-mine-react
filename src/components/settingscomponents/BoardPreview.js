// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class BoardPreview extends Component{
    constructor(props){
        super(props);
    }
    componentDidUpdate(){

    }
    render(){
        return(
            <div id={'board-preview'}>

            </div>
        )
    }
}


const mapStateToProps = state => ({
    //general
    kernelTypeId: state.generalSettings.kernelTypeId,
    kernelCenter: state.generalSettings.kernelCenter,
    showTileValues: state.generalSettings.showTileValues,

    //logic
    haveAntiMines:  state.logicSettings.haveAntiMines,

});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BoardPreview);