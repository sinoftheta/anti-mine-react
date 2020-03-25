// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {setBoardRender, deriveData, changeToView, updateCutoff, updateMultiplier, setRemainingMines, setHP} from './../redux/actions/index.js';
import {cutoffRange, multiplierRange} from './../data/DefaultSettings.js';

// COMPONENTS //
import GameManager from './../js/GameManager.js';
import Board from './gamecomponents/Board.js';

// setup board, cursor, and game instance
class AntiMine extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            gameWon: false,
            gameLost: false,
        }
    }
    componentDidMount(){
        this.props.deriveData();
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.loadGame();
            this.setState({loading: false});
        }
    }
    loadGame(){
        // instantiate new GameLogic
        console.log('loading new gameLogic')
        console.log(this.props.logicSettings)
        console.log(this)

        

        this.manager = new GameManager({
            ...this.props.logicSettings,
            ...{seed: Math.floor(Math.random() * 133742069)},
            ...{
                    onDamageTaken: () => {console.log('ouch!');},
                    onGameLost: () => console.log('you lost :('), 
                    onGameWon: () => console.log('you won :)'), 
                    //onTilesUpdated: () => {console.log('all tiles updated'); /*this.props.setBoardRender(this.game.field)*/},
                    onMineRevealed: () => console.log('mine revealed,')
            }
        });

        this.manager.OnBoardUpdated = () => {
            console.log('OnBoardUpdated!!'); 
            this.props.setBoardRender(this.manager.board);
            this.props.setRemainingMines();
            this.props.setHP();
        };
        this.props.setBoardRender(this.manager.board);
        
    }
    
    render(){
        
        return this.state.loading ? 
            <div id={'__GAME__loading'}/> //could play A board building animation here...?
            :
            <>
                <div id={'__GAME__grid'}>
                        <Board 
                            click={(x,y) => this.manager.revealTile(x,y)}
                        />
                        {/* might make these into their own components? */}
                        <div id={'__GAME__hp-bar'}>{this.props.hp}</div>
                        <div id={'__GAME__remaining-mines'}>{this.props.remainingMines}</div>
                        <div id={'__GAME__color-controls'}>

                            <div>Multiplier</div>
                            <input 
                                type={'range'} 
                                min={multiplierRange[0]} 
                                step={0.1}
                                max={multiplierRange[1]} 
                                value={this.props.multiplier} 
                                onChange={(e) => {
                                    this.props.updateMultiplier(e.target.value);
                                }}
                            />

                            <div>Cutoff</div>
                            <input 
                                type={'range'} 
                                min={cutoffRange[0]} 
                                step={0.1}
                                max={cutoffRange[1]} 
                                value={this.props.cutoff} 
                                onChange={(e) => {
                                    this.props.updateCutoff(e.target.value);
                                }}
                            />

                        </div>
                </div>

                {/* TODO: prompt users before leaving if game in progress */}
                <button onClick={() => this.props.changeToView('title')}>
                    Title
                </button>
                <button onClick={() => this.props.changeToView('settings')}>
                    Settings
                </button>
                <button onClick={() => this.loadGame()}>
                    Reset
                </button>
            </>
            ;
    }
}

const mapStateToProps = state => ({
    board: state.board,
    logicSettings: state.logicSettings
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBoardRender:setBoardRender,
    deriveData:deriveData,
    changeToView:changeToView,
    setHP:setHP,
    setRemainingMines:setRemainingMines,

    //will be in their own component...
    updateCutoff:updateCutoff,
    updateMultiplier:updateMultiplier,

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AntiMine);