// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// REDUX ACTIONS //
import {setBoardRender,loadRaster} from './../redux/actions/index.js';

// COMPONENTS //
import GameManager from './../js/GameManager.js';
import Board from './gamecomponents/Board.js';


// setup board, cursor, and game instance
class AntiMine extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            //...game settings comes from redux
        }
    }
    componentDidMount(){
        this.loadGame();
        this.setState({loading: false});
        //this.props.loadRaster();
        
    }
    loadGame(){
        // instantiate new GameLogic
        console.log('loading new gameLogic')
        console.log(this.props.settings)
        console.log(this)
        this.manager = new GameManager({
            ...this.props.settings,
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
            ;
    }
}


const mapStateToProps = state => ({
    board: state.board,
    settings: state.settings
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBoardRender:setBoardRender,
    loadRaster:loadRaster
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AntiMine);