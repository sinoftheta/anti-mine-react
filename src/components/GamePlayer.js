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
import RemainingMines from './gamecomponents/RemainingMines.js';
import HPBar from './gamecomponents/HPBar.js';
import KernelTool from './gamecomponents/KernelTool.js';

import './GamePlayer.css';

import revealTileAudio1 from "../assets/audio/tile_reveal_1.mp3";
import revealTileAudio2 from "../assets/audio/tile_reveal_2.mp3";
import mineHitAudio from "../assets/audio/mine_hit.mp3";

// setup board, cursor, and game instance
class GamePlayer extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            gameWon: false,
            gameLost: false,
            initHP: 1,
        }
        this.mineHitAudio = React.createRef();
        this.revealTileAudio1 = React.createRef();
        this.revealTileAudio2 = React.createRef();
    }
    componentDidMount(){
        this.props.deriveData();
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.loadGame();
            this.setState({loading: false, initHP: this.manager.hitpoints});
        }
    }
    loadGame(){

        // instantiate new GameLogic
        this.manager = new GameManager({
            ...this.props.logicSettings,
            ...{seed: Math.floor(Math.random() * 133742069)},
            ...{
                    onDamageTaken: () => {console.log('ouch!'); this.mineHitAudio.current.play()},
                    onGameLost: () => console.log('you lost :('), 
                    onGameWon: () => console.log('you won :)'), 
                    //onTilesUpdated: () => {console.log('all tiles updated'); /*this.props.setBoardRender(this.game.field)*/},
                    onMineRevealed: () => console.log('mine revealed,')
            }
        });

        this.manager.OnBoardUpdated = () => {
            //console.log('OnBoardUpdated!!'); 
            this.props.setBoardRender(this.manager.board);
            this.props.setRemainingMines(this.manager.remainingMines);
            this.props.setHP(this.manager.hitpoints);

            Math.random() > 0.5 ? 
            this.revealTileAudio1.current.play()
            :
            this.revealTileAudio2.current.play()
            ;
        };
        this.props.setBoardRender(this.manager.board);
        this.props.setRemainingMines(this.manager.remainingMines);
        this.props.setHP(this.manager.hitpoints);
        
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
                        
                        <div id={'__GAME__remaining-mines'}>{this.props.remainingMines}</div>
                        <RemainingMines/>
                        <HPBar initHP={this.state.initHP}/>
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
                <KernelTool/>

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

                <audio ref={this.mineHitAudio} src={mineHitAudio}/>
                <audio ref={this.revealTileAudio1} src={revealTileAudio1}/>
                <audio ref={this.revealTileAudio2} src={revealTileAudio2}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayer);