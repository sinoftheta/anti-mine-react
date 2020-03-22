// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {changeToView} from './../redux/actions/index.js';

const kernelTypes = ['taxi','kernel'];

class Settings extends Component{
    constructor(props){
        super(props);

        //need to import init state values from a master default state...
        this.state = {
            kernelTypeId: 0,
            kernelCenter: 3,
            color: {},
            haveAntiMines:  true,
            rows: 10,
            columns: 10,

            bgScroll: true,

        }
    }
    render(){
        return(
            <>
                <div> Settings </div>

                <button onClick={() => this.props.changeToView('play')}>
                    Play
                </button>
                <button onClick={() => this.props.changeToView('title')}>
                    Title
                </button>

                <div id={'settings-container'}> {/* will prob be a css grid */}

                    {/*this will probably make this into its own comp to give it fun animations */}
                    <div>mine field shape</div>
                    <button onClick={()=>this.setState(ps => ({kernelTypeId: (ps.kernelTypeId + 1) % kernelTypes.length}))}>
                        {kernelTypes[this.state.kernelTypeId]}
                    </button>

                    
                    <div>mine power</div>
                    <input 
                        type="number" 
                        min={2} 
                        max={20}
                        value={this.state.kernelCenter}
                        onChange={(e)=>{
                            if(e.target.value >= 2 && e.target.value <= 20) 
                                this.setState({kernelCenter: e.target.value});
                        }}
                    />

                    <div>anti mines</div>
                    <button onClick={()=>this.setState(ps => ({haveAntiMines: !ps.haveAntiMines}))}>
                        {this.state.haveAntiMines? 'ON':'OFF'}
                    </button>

                    <div>background scroll (will be replaced with icon)</div>
                    <button onClick={()=>this.setState(ps => ({bgScroll: !ps.bgScroll}))}>
                        {this.state.bgScroll? 'ON':'OFF'}
                    </button>


                </div>
            </>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeToView: changeToView
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);