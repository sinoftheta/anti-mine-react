// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {changeToView, updateLogicSettings, updateGenSettings, deriveData} from './../redux/actions/index.js';

// DATA //
import {initLogicSettings, initGenSettings, kernelTypes} from './../data/DefaultSettings.js';
import themes from './../data/ColorSchemes.js';

// COMPONENTS //
import BoardPreview from './settingscomponents/BoardPreview.js';

const gameModes = ['Custom', 'Novice', 'Intermediate', 'Expert', 'WideBrain'];
const tileSizes = ['small', 'medium', 'large'];
const themeTitles = themes.map(theme => theme.title);


class Settings extends Component{ //change this into a stateless component when its contents are made into classes
    constructor(props){
        super(props);
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

                 <BoardPreview/>

                <div id={'settings-container'}> {/* will prob be a css grid */}

                    {/* make list selects into component (toggles are an instance of list select) */}
                    <div>Mine Field</div>
                    <button onClick={()=>{
                        this.props.updateGenSettings({kernelTypeId: (this.props.kernelTypeId + 1) % kernelTypes.length});
                        this.props.deriveData();
                        }}>
                        {kernelTypes[this.props.kernelTypeId]}
                    </button>

                    <div>Tile Sizes</div>
                    <button onClick={()=>this.props.updateGenSettings({tileSizeId: (this.props.tileSizeId + 1) % tileSizes.length})}>
                        {tileSizes[this.props.tileSizeId]}
                    </button>

                    <div>Board Theme</div>
                    <button onClick={()=>
                        this.props.updateGenSettings({themeId: (this.props.themeId + 1) % themeTitles.length})}>
                        {themeTitles[this.props.themeId]}
                    </button>

                    <div>Difficulty</div>
                    <button onClick={()=>this.props.updateGenSettings({difficultyId: (this.props.difficultyId + 1) % gameModes.length})}>
                        {gameModes[this.props.difficultyId]}
                    </button>

                    {/* make the number selector into a component too*/}
                    <div>Mine Power</div>
                    <input 
                        type="number" 
                        min={2} 
                        max={20}
                        value={this.props.kernelCenter}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 2 && next <= 20)
                                this.props.updateGenSettings({kernelCenter: next});
                                this.props.deriveData();
                        }}
                    />
                    <div>Height</div>
                    <input 
                        type="number" 
                        min={5} 
                        max={50}
                        value={this.props.rows}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 5 &&
                                 next <= 50 &&
                                 next * this.props.columns > this.props.numMines + 5
                                 ) 
                                this.props.updateLogicSettings({rows: next});
                        }}
                    />
                    <div>Width</div>
                    <input 
                        type="number" 
                        min={5} 
                        max={50}
                        value={this.props.columns}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 5 &&
                                 next <= 50 &&
                                 this.props.rows * next > this.props.numMines + 5
                                 ) 
                                this.props.updateLogicSettings({columns: next});
                        }}
                    />
                    <div>Mines</div>
                    <input 
                        type="number" 
                        min={3} 
                        max={1250}
                        value={this.props.numMines}
                        onChange={(e)=>{
                            let next = e.target.value;
                            if  (next >= 5 &&
                                 next <= 1250 &&
                                 this.props.rows * this.props.columns > next + 5
                                 ) 
                                this.props.updateLogicSettings({numMines: next});
                        }}
                    />


                    <div>Show Tile Values</div>
                    <button onClick={()=>this.props.updateGenSettings({showTileValues: !this.props.showTileValues})}>
                        {this.props.showTileValues? 'ON':'OFF'}
                    </button>

                    <div>Anti-mines</div>
                    <button onClick={()=> {

                    
                        this.props.updateLogicSettings({haveAntiMines: !this.props.haveAntiMines})
                        this.props.deriveData();
                    }}>
                        {this.props.haveAntiMines? 'ON':'OFF'}
                    </button>

                    <div>Background Scroll (will be replaced with icon)</div>
                    <button onClick={()=>this.props.updateGenSettings({bgScroll: !this.props.bgScroll})}>
                        {this.props.bgScroll? 'ON':'OFF'}
                    </button>

                    {/* make these sliders into their own components too */}
                    <div>Multiplier</div>
                    <input 
                        type={'range'} 
                        min={1} 
                        step={0.1}
                        max={7} 
                        value={this.props.multiplier} 
                        onChange={(e) => console.log('multiplier: ' + e.target.value)}
                    />

                    <div>Cutoff</div>
                    <input 
                        type={'range'} 
                        min={0} 
                        step={0.1}
                        max={3} 
                        value={this.props.cutoff} 
                        onChange={(e) => console.log('cutoff: ' + e.target.value)}
                    />

                </div>
            </>
        );
    }
}


const mapStateToProps = state => ({
    //general
    themeId: state.generalSettings.themeId,
    kernelTypeId: state.generalSettings.kernelTypeId,
    tileSizeId: state.generalSettings.tileSizeId,
    difficultyId: state.generalSettings.difficultyId,
    kernelCenter: state.generalSettings.kernelCenter,
    showTileValues: state.generalSettings.showTileValues,
    bgScroll: state.generalSettings.bgScroll,
    cutoff: state.cutoff,
    multiplier: state.multiplier,
    

    //logic
    numMines: state.logicSettings.numMines,
    rows: state.logicSettings.rows,
    columns: state.logicSettings.columns,
    haveAntiMines:  state.logicSettings.haveAntiMines,

});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeToView: changeToView,
    updateLogicSettings: updateLogicSettings,
    updateGenSettings: updateGenSettings,
    deriveData:deriveData,

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);