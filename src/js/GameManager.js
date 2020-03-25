import seedrandom from 'seedrandom';
import GameLogic from './GameLogic.js';

export default class GameManager{ 
    //there may be different types of GameManagers
    // such as one for story mode, free play, multiplayer, ect...
    constructor(settings, startLevel){

        this.preset = !!settings.presetBoard;
        this.firstClick = true;

        this.game = new GameLogic(settings);
        if(this.preset){
            this.game.setupFromPreset();
            this.game.placeNumbersKernel();    
        }else{
            this.game.setup();
        }
    }

    set OnBoardUpdated(f){this.game.settings.onBoardUpdated = f;}
    get board(){return this.game.field;}
    get hitpoints(){return this.game.hitpoints;}
    get remainingMines(){return this.game.numMines - this.game.minesRevealed}
    flagTile = (x,y) => {this.game.flagTile(x,y);}

    revealTile = (x,y) => {
        if(this.firstClick && !this.preset){
            this.firstClick = false;
            this.game.placeMinesRandom({x:x,y:y})
            this.game.placeNumbersKernel();    
        }
        this.game.revealTile(x,y);
    }

    resetGame(settings){
        this.firstClick = true;
        this.game.settings = settings;
        this.game.setup();
    }
}