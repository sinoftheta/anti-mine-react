// REACT //
import React, { Component } from 'react';

// REDUX //
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import Board from '../gamecomponents/Board.js';
import GameManager from '../../js/GameManager.js';

import {setBoardRender, deriveData} from '../../redux/actions/index.js';
//a custom board meant to reflect parts of the current settings

// both are 7x7
const boards =[[[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]],

                [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,1,0,0],
                [0,0,0,0,0,0,0],
                [0,-1,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]],

                [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,1,0,-1,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]],

                [[0,0,0,0,0,0,0],
                [0,1,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,-1,0],
                [0,0,0,0,0,0,0]]]


// setup board, cursor, and game instance
class BoardPreview extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }
    }
    shouldComponentUpdate(){
        console.log('boardPreview deciding to update!')
        return true;
    }
    componentDidMount(){
        this.props.deriveData();
        //this.loadGame();
    }
    componentDidUpdate(prevProps){
        if(
            prevProps.board === this.props.board    || 
            prevProps.haveAntiMines !== this.props.haveAntiMines ||
            this.state.loading
        ){
            this.setState({loading: false});
            this.loadGame();
        }
        
    }
    loadGame(){
        // instantiate new GameLogic
        //console.log('loading new gameLogic')
        //console.log(this.props.logicSettings)
        //console.log(this.props.kernel)
        //console.log(this.props.haveAntiMines)

        //nooed some way to save n...
        let n = Math.floor(Math.random() * (boards.length - 1)) + 1;

        this.manager = new GameManager({
            ...this.props.logicSettings,
            ...{
                //custom logic settings
                presetBoard: this.props.haveAntiMines? boards[3] : boards[0],
                kernel: this.props.kernel,

            },
            ...{
                    onDamageTaken: () => {},
                    onGameLost: () => {}, 
                    onGameWon: () => {}, 
                    onMineRevealed: () => {}
            }

        });

        this.manager.OnBoardUpdated = () => {console.log('OnBoardUpdated!!'); this.props.setBoardRender(this.manager.board);};
        console.log(this.manager.board)
        this.props.setBoardRender(this.manager.board);
        
    }
    render(){
        
        return this.state.loading ? 
            <div id={'preview-loading'}/> //could play A board building animation here...?
            :
            <Board  
                click={() => console.log(':)')} // trigger some fun animation idk
                renderUncovered
            />
            ;
    }
}


const mapStateToProps = state => ({
    board: state.board,
    logicSettings: state.logicSettings,
    haveAntiMines: state.logicSettings.haveAntiMines,
    kernel: state.logicSettings.kernel,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBoardRender:setBoardRender,
    deriveData:deriveData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BoardPreview);