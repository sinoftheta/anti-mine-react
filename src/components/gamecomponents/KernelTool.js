// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class KernelTool extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }
    componentWillUnmount(){
        //remove window listener
    }
    render(){
        console.log('===kernel tooltip===')
        console.log(this.props.kernel);
        console.log(this.props.currentTile);
        return(
            <>
                <div/>
            </>
        )
    }
}


const mapStateToProps = state => ({
    kernel: state.logicSettings.kernel,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(KernelTool);