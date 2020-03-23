// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {setBoardRender, deriveData, changeToView} from './../redux/actions/index.js';

// COMPONENTS //
import GameManager from './../js/GameManager.js';
import Board from './gamecomponents/Board.js';


// setup board, cursor, and game instance
class AntiMine extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            cutoff: 0.12,
            multiplier: 1.0,
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
            ...{
                    onDamageTaken: () => {console.log('ouch!');},
                    onGameLost: () => console.log('you lost :('), 
                    onGameWon: () => console.log('you won :)'), 
                    //onTilesUpdated: () => {console.log('all tiles updated'); /*this.props.setBoardRender(this.game.field)*/},
                    onMineRevealed: () => console.log('mine revealed,')
            }
        });

        //todo: write a setter for this
        //register onTilesUpdated callback
        console.log(this.manager)
        //this.manager.OnBoardUpdated = () => this.props.setBoardRender(this.manager.board);
        this.manager.OnBoardUpdated = () => {console.log('OnBoardUpdated!!'); this.props.setBoardRender(this.manager.board);}
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
                            cutoff={this.state.cutoff}
                            multiplier={this.state.multiplier}
                        />
                        {/* might make these into their own components? */}
                        <div id={'__GAME__hp-bar'}>{this.props.hp}</div>
                        <div id={'__GAME__remaining-mines'}>{this.props.remainingMines}</div>
                        {/*<VisualControls/>*/}
                </div>
                <button onClick={() => this.props.changeToView('title')}>
                    Title
                </button>
                <button onClick={() => this.props.changeToView('settings')}>
                    Settings
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
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AntiMine);