// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {changeToView} from './../redux/actions/index.js';

class Title extends Component{
    constructor(props){
        super(props);

        //use state for animations?
    }
    render(){
        return(
            <div>
                <div>
                    Anti Mine
                </div>
                <button onClick={() => this.props.changeToView('play')}>
                    Play
                </button>
                <button onClick={() => {}}>
                    About
                </button>
                <button onClick={() => this.props.changeToView('settings')}>
                    Settings
                </button>
                {/*<button onClick={() => this.props.changeToView('play')}>
                    Online?
                </button>*/}
            </div>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeToView: changeToView
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Title);