// REACT //
import React, { Component } from 'react';

// import game logic (vanilla js)

// import canvas logic (vanilla js) 

class BoardCanvas extends Component{
    constructor(props){
        super(props);

        this.canvas = React.createRef();
    }
    componentDidMount(){
        // setup game logic
        // pass props to logic & canvas
        // pass to canvas logic

    }
    render(){
        return <canvas ref={canvas}/>
    }
}

export default BoardCanvas;