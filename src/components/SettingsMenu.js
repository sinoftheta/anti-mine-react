// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {changeToView} from './../redux/actions/index.js';

// DATA //
import {initLogicSettings, initGenSettings, kernelTypes} from './../data/DefaultSettings.js';
import themes from './../data/ColorSchemes.js';

const tileSizes = ['small', 'medium', 'large'];
const themeTitles = themes.map(theme => theme.title);

class Settings extends Component{
    constructor(props){
        super(props);

        //need to import init state values from a master default state...
        this.state = {
            //logic
            kernelTypeId: 0,
            kernelCenter: 3,
            haveAntiMines:  true,
            rows: 10,
            columns: 10,
            numMines: 5,
            
            //general
            themeId: 0,
            showTileValues: false, 

            //app settings
            bgScroll: true,
            tileSizeId: 0,
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

                    {/* make list selects into component (toggles are an instance of list select) */}
                    <div>Mine Field</div>
                    <button onClick={()=>this.setState(ps => ({kernelTypeId: (ps.kernelTypeId + 1) % kernelTypes.length}))}>
                        {kernelTypes[this.state.kernelTypeId]}
                    </button>

                    <div>Tile Sizes</div>
                    <button onClick={()=>this.setState(ps => ({tileSizeId: (ps.tileSizeId + 1) % tileSizes.length}))}>
                        {tileSizes[this.state.tileSizeId]}
                    </button>

                    <div>Board Theme</div>
                    <button onClick={()=>this.setState(ps => ({themeId: (ps.themeId + 1) % themeTitles.length}))}>
                        {themeTitles[this.state.themeId]}
                    </button>

                    {/* make the number selector into a component too*/}
                    <div>Mine Power</div>
                    <input 
                        type="number" 
                        min={2} 
                        max={20}
                        value={this.state.kernelCenter}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 2 && next <= 20)
                                this.setState({kernelCenter: next});
                        }}
                    />
                    <div>Height</div>
                    <input 
                        type="number" 
                        min={5} 
                        max={50}
                        value={this.state.rows}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 5 &&
                                 next <= 50 &&
                                 next * this.state.columns > this.state.numMines + 5
                                 ) 
                                this.setState({rows: next});
                        }}
                    />
                    <div>Width</div>
                    <input 
                        type="number" 
                        min={5} 
                        max={50}
                        value={this.state.columns}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 5 &&
                                 next <= 50 &&
                                 this.state.rows * next > this.state.numMines + 5
                                 ) 
                                this.setState({columns: next});
                        }}
                    />
                    <div>Mines</div>
                    <input 
                        type="number" 
                        min={3} 
                        max={1250}
                        value={this.state.numMines}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 5 &&
                                 next <= 1250 &&
                                 this.state.rows * this.state.columns > next + 5
                                 ) 
                                this.setState({numMines: next});
                        }}
                    />


                    <div>Show Tile Values</div>
                    <button onClick={()=>this.setState(ps => ({showTileValues: !ps.showTileValues}))}>
                        {this.state.showTileValues? 'ON':'OFF'}
                    </button>

                    <div>Anti-mines</div>
                    <button onClick={()=>this.setState(ps => ({haveAntiMines: !ps.haveAntiMines}))}>
                        {this.state.haveAntiMines? 'ON':'OFF'}
                    </button>

                    <div>Background Scroll (will be replaced with icon)</div>
                    <button onClick={()=>this.setState(ps => ({bgScroll: !ps.bgScroll}))}>
                        {this.state.bgScroll? 'ON':'OFF'}
                    </button>

                </div>

                {/* <BoardPreview
                        tileValues={this.state.showTileValues}
                        kernelCenter={}
                        haveAntiMines={}
                        theme={this.state.theme}
                /> */}

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