/*
    GameLogic.js
    Contains all game logic.
    
    API notes
    
    Setting up the board via placeNumbersKernel(), placeMinesRandom(), and placeMinesPreset() is the responsibility of the user
    Resetting the game is the responsibility of the user

*/

//https://www.digitalocean.com/community/tutorials/wrap-a-vanilla-javascript-package-for-use-in-react


import Cell from './Cell.js';
import seedrandom from 'seedrandom';

export default class GameLogic{
    constructor(settings){
        this.settings = settings;
    }
    setupFromPreset = () => {
        console.log('setting up from preset')
        this.rows = this.settings.presetBoard.length;
        this.columns = this.settings.presetBoard[0].length;
        this.area = this.rows * this.columns;

        this.gameLost = false;
        this.gameWon = false;
        this.mineRevealList = [];
        this.minesRevealed = 0;
        this.safeTilesRevealed = 0;

        //instantiate field of cells
        this.field = [];
        for(let i = 0; i < this.rows; i++){ 
            this.field[i] = [];
            for(let j = 0; j < this.columns; j++){
                this.field[i][j] = new Cell(i,j);
            }
        }

        this.placeMinesPreset();
        this.hitpoints = this._hitpointsCalc(this.settings.kernelWeight, this.numMines);

    }
    setup = () => { //may change to num mines + num anti mines, maybe a mine will just have random value 

        console.log('setting up')
        this.numMines = this.settings.numMines;
        this.rows = this.settings.rows;
        this.columns = this.settings.columns;
        this.area = this.rows * this.columns;

        this.gameLost = false;
        this.gameWon = false;
        this.mineRevealList = [];
        this.minesRevealed = 0;
        this.safeTilesRevealed = 0;

        this.hitpoints = this._hitpointsCalc(this.settings.kernelWeight, this.numMines);
        //console.log("HP: " + this.hitpoints)

        //instantiate field of cells
        this.field = [];
        for(let i = 0; i < this.rows; i++){ 
            this.field[i] = [];
            for(let j = 0; j < this.columns; j++){
                this.field[i][j] = new Cell(i,j);
            }
        }
    }
    flagTile = (x,y) => {
        let target = this.field[x][y];
        //cycle flag value
        target.flagState = (target.flagState + 1) % 3;
        console.log(target.flagState);
    }
    revealTile = (x,y) => {
        //console.log(`revealing (${x}, ${y})`);
        
        //TODO: error checking on x, y
        if(this.gameLost || this.gameWon || this.field[x][y].revealed) return;


        let target = this.field[x][y];
    
        if(target.isMine){
            this._mineHit(target.value);

            if(!target.revealed){
                target.revealed = true;
                this.minesRevealed++;
                //BROADCAST
                this.settings.onMineRevealed();
            }

        }else{
            this._autoRevealTile(x, y); 
        }
        
        
        //check for solved mines
        this._resetCheckStatus();
        this.mineRevealList.forEach((mine) => {
            this._autoRevealMine(mine);
        });
        
        //TODO: implement this
        //use these and/or perhapse a tilesUpdated list for animations
        //this._resetCheckStatus();
        //this.mineRevealList = []; 

        //BROADCAST
        this.settings.onBoardUpdated();


        //check for loss
        if(this.gameLost){
            //BROADCAST
            this.settings.onGameLost();
        }

        //check win condition
        this.gameWon = (this.minesRevealed === this.numMines) || (this.minesRevealed + this.safeTilesRevealed === this.area) || (this.numMines + this.safeTilesRevealed === this.area);

        if(this.gameWon && !this.gameLost){
            //BROADCAST

            this.settings.onGameWon();
        }
        //console.log('mines revealed: ' + this.minesRevealed + ' totalMines: ' + this.numMines);
        //console.log('safe tiles revealed: ' + this.safeTilesRevealed + ' area: ' + this.area);

    }
    _mineHit(value){

        let c = 1; //constant ensures that hitting a null mine results in losing health

        let damage = Math.abs(value) + c; 
        //console.log('you lost ' + damage + ' health');
        this.hitpoints -= damage;

        //BROADCAST
        this.settings.onDamageTaken();

        //check for loss
        if(this.hitpoints <= 0) this.gameLost = true;
    }
    _autoRevealMine(target){//TODO: NEED TO RECHECK WIN CONDITION
        
            /*
            each mine will be in one of 4 cases
            
            case 1: all neighbors are revealed & safe -> reveal
            case 2: mine has a safe & unrevealed neighbor -> dont reveal
            case 3: mine is part of a mine island with revealed + safe neighbors -> reveal all mines in island
            case 4: part of a mine island with a safe + unrevealed neighbor -> dont reveal any mines in island
            case 1 & 2 are instances of 3 & 4, respectively
            mines are guarenteed to be unrevealed
            all tiles are "unchecked" to start
            THEREFORE:
            */

            //1: determine mine island
            let island = [];
            this._mineIslandFinder(target.x, target.y ,island);
            //console.log('-=-=-=island=-=-=-')
            //console.log(island);
            
            //2: determine if perimeter of island is revealed
            let field = this.field;
            let islandRevealed = island.reduce((acc, mine) => {
                let x = mine.x, y = mine.y;
                    /*console.log(field[x][y+1] ? (field[x][y+1].revealed || field[x][y+1].isMine) : true)
                    console.log(field[x][y-1] ? (field[x][y-1].revealed || field[x][y-1].isMine) : true)
                    console.log(field[x+1] ? (field[x+1][y].revealed || field[x+1][y].isMine) : true)
                    console.log(field[x-1] ? (field[x-1][y].revealed || field[x-1][y].isMine) : true)
                    console.log((field[x+1] && field[x+1][y+1]) ? (field[x+1][y+1].revealed || field[x+1][y+1].isMine) : true)
                    console.log((field[x-1] && field[x-1][y+1]) ? (field[x-1][y+1].revealed || field[x-1][y+1].isMine) : true)
                    console.log((field[x+1] && field[x+1][y-1]) ? (field[x+1][y-1].revealed || field[x+1][y-1].isMine) : true)
                    console.log((field[x-1] && field[x-1][y-1]) ? (field[x-1][y-1].revealed || field[x-1][y-1].isMine) : true) */

                //very sloppy, a fuck ton of redundant checks, should refactor using recursion to check perimeter...?
                return (
                    acc &&
                    //check if a neighbor exists, then check if that neighbor is revealed OR is a mine
                    (field[x][y+1] ? (field[x][y+1].revealed || field[x][y+1].isMine) : true) &&
                    (field[x][y-1] ? (field[x][y-1].revealed || field[x][y-1].isMine) : true) &&
                    (field[x+1] ? (field[x+1][y].revealed || field[x+1][y].isMine) : true) &&
                    (field[x-1] ? (field[x-1][y].revealed || field[x-1][y].isMine) : true) &&
                    ((field[x+1] && field[x+1][y+1]) ? (field[x+1][y+1].revealed || field[x+1][y+1].isMine) : true) &&
                    ((field[x-1] && field[x-1][y+1]) ? (field[x-1][y+1].revealed || field[x-1][y+1].isMine) : true) &&
                    ((field[x+1] && field[x+1][y-1]) ? (field[x+1][y-1].revealed || field[x+1][y-1].isMine) : true) &&
                    ((field[x-1] && field[x-1][y-1]) ? (field[x-1][y-1].revealed || field[x-1][y-1].isMine) : true)
                );
            }, true);

            if(islandRevealed){
                //console.log('revealing island');
                island.forEach(member => {
                    if(!member.revealed){
                        member.revealed = true;
                        this.minesRevealed++;
                    }
                });
                //BROADCAST
                this.settings.onMineRevealed();
            }
    }
    _mineIslandFinder(x, y, island){
        let field = this.field;
        if(!(field[x] && field[x][y])) return;

        let target = field[x][y];
        if(target.checked) return;
        target.checked = true;


        if(target.isMine){ //only add to an island if its not part of an existing island... need island IDs... or more elegant code...
            island.push(target);
        }else{
            return;
        }

        //east
        this._mineIslandFinder(x + 1, y, island);

        //north
        this._mineIslandFinder(x, y + 1, island);

        //west
        this._mineIslandFinder(x - 1, y, island);

        //south
        this._mineIslandFinder(x, y - 1, island);

        //northeast
        this._mineIslandFinder(x + 1, y + 1, island);

        //northwest
        this._mineIslandFinder(x - 1, y + 1, island);

        //southwest
        this._mineIslandFinder(x - 1, y - 1, island);

        //southeast
        this._mineIslandFinder(x + 1, y - 1, island);
    
    }
    
    placeMinesRandom = (exclude) => { 

        if(this.numMines >= this.area){
            console.error('Too many mines for this board size');
            this.gameWon = true;
            this.settings.onGameWon();
            return;
        }
        let n = this.numMines, x, y, target,
        rng = seedrandom('' + this.settings.seed + this.rows + this.columns);

        while(n > 0){
            x = Math.floor(rng() * this.rows );
            y = Math.floor(rng() * this.columns );

            if(exclude && x == exclude.x && y == exclude.y) continue;

            target = this.field[x][y];

            //if no mine already at x,y
            if(!target.isMine){
                target.value = this.settings.haveAntiMines? (rng() > .5 ? 1 : -1) : 1;
                target.isMine = true;
                --n;
            }
        }
    }
    placeMinesPreset = () => {
        this.numMines = 0;
        for(let i = 0; i < this.rows; i++){ 
            for(let j = 0; j < this.columns; j++){
                if(this.settings.presetBoard[i][j] !== 0){
                    this.field[i][j].isMine = true;
                    this.numMines++;
                }
                this.field[i][j].value = this.settings.presetBoard[i][j];
            }
        }
    }
    
    placeNumbersKernel = () => {
        console.log('placing them numbers')
        console.log(this.settings.kernel)
        
        let k = this.settings.kernel;
        let field = this.field;
        let tempField = [];
        
        //instantiate temp field within first iteration

        //iterate through board
        for(let i = 0; i < this.rows; i++){ 
            tempField[i] = [];
            for(let j = 0; j < this.columns; j++){
                
                tempField[i][j] = 0;

                //iterate through kernel
                for(let m = 0; m < k.length; m++){

                    let offset_i = m - Math.floor(k.length/2);

                    for(let n = 0; n < k[0].length; n++ ){

                        let offset_j = n - Math.floor(k[0].length/2);
                    
                        //check if kernel is out of bounds
                        if(field[i + offset_i] && field[i + offset_i][j + offset_j]){

                            //compute new val
                            tempField[i][j] += field[i + offset_i][j + offset_j].value * k[m][n]; 
                        }
                    }
                }
            }
        }

        //put temp values in field
        for(let i = 0; i < this.rows; i++){ //vertical
            for(let j = 0; j < this.columns; j++){ //horizontal
                this.field[i][j].value = tempField[i][j];
            }
        }
    }
    _autoRevealTile(x,y, originValue){
        let field = this.field;

        //check if target exists
        if(!(field[x] && field[x][y])) return;

        let target = field[x][y];

        //new logic to correct for new originValue passing logic
        if((target.checked && target.isMine) || target.revealed) return;

        //check if mine is revealed or has been checked
        //if(target.checked || target.revealed) return;
        target.checked = true;

        if(typeof originValue === 'number'){
            //not original click, auto reveal behavor

            //dont auto reveal mines
            if(target.isMine){
                this.mineRevealList.push(target);
                return;
            } 

            //stop at 0 or sign change boundary
            if(target.value !== 0 && originValue === 0)return;

            //"down hill both ways"
            if(target.value > 0 && originValue < 0)return;//{ console.log('=-=-=- not revealed 4 =-=-=-=-='); return;}
            if(target.value < 0 && originValue > 0)return;//{ console.log('=-=-=- not revealed 5 =-=-=-=-='); return;}
            if(originValue > 0 && target.value > originValue)return;//{ console.log('=-=-=- not revealed 1 =-=-=-=-='); return;} //only uncover "down hill" if positive
            if(originValue < 0 && target.value < originValue)return;//{ console.log('=-=-=- not revealed 2 =-=-=-=-='); return;} //only uncover "up hill" if negative

        }
        else{
            originValue = target.value;
        }

        //reveal tile

        if(!target.revealed){
                target.revealed = true;
                this.safeTilesRevealed++; 
        }

        
        // recurse over all neighbors, example of a DFS

        //"down hill both ways, never back up hill"

        //east
        this._autoRevealTile(x + 1, y, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //north
        this._autoRevealTile(x, y + 1, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //west
        this._autoRevealTile(x - 1, y, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //south
        this._autoRevealTile(x, y - 1, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //dont recurse over diagonals...?
        return;

        //northeast
        this._autoRevealTile(x + 1, y + 1, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //northwest
        this._autoRevealTile(x - 1, y + 1, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //southwest
        this._autoRevealTile(x - 1, y - 1, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);

        //southeast
        this._autoRevealTile(x + 1, y - 1, Math.abs(originValue) > Math.abs(target.value) ? target.value : originValue);
        
        
    }
    _resetCheckStatus(){
        for(let i = 0; i < this.rows; i++){ //vertical
            for(let j = 0; j < this.columns; j++){ //horizontal
                this.field[i][j].checked = false;
            }
        }
    }
    _hitpointsCalc(Kweight, mines, area){
        let hp = Math.ceil(mines * 0.25 * Kweight * 0.1); //formula needs improvement. gives 1hp for early levels.
        return hp; 
    
    }
}