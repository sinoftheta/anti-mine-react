import seedrandom from 'seedrandom';
import GameLogic from './GameLogic.js';

export default class GameManager{ 
    //there may be different types of GameManagers
    // such as one for story mode, free play, multiplayer, ect...
    constructor(settings, startLevel){
        this.game = new GameLogic(settings);

        this.firstClick = true;
    }

    set OnBoardUpdated(f){
        this.game.settings.onBoardUpdated = f;
    }

    get board(){
        return this.game.field;
    }

    flagTile = (x,y) => {
        this.game.flagTile(x,y);
    }

    revealTile = (x,y) => {
        if(this.firstClick){
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