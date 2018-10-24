import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: null,
    }  
  };

  onclickhandler = () => {
    if(!this.state.value){
    this.setState({value: this.props.getturn()});
    this.props.switchturn();
    this.props.setStatus(this.props.index, this.props.getturn() );
    
    }
  }

    render() { 
        return ( 
            <button className="square" onClick={this.onclickhandler}>
                {this.state.value}
          </button>
         );
    }
}

class Board extends React.Component {


  constructor(props){
    super(props);
    this.state ={
      turn: 'X',
      status:[null,null,null,null,null,null,null,null,null]
    }
  }
  
  

  setStatus = (i,value) =>{
    const newStatus = this.state.status;
    newStatus[i] = value;
    this.setState({status : newStatus});
    console.log(this.state.status)
  }

  reset = ()=>{
    window.location.reload();
  }

  switchturn = () => {
    this.state.turn === 'X' ? this.setState({turn: 'O'}): this.setState({turn: 'X'});
  };

  getturn = () =>{
    return this.state.turn
  }

  renderSquare(i) {
      return <Square index={i}  switchturn={this.switchturn} getturn={this.getturn} setStatus = {this.setStatus}/>;
      
    }; 
     checkWinner= (status)=>{
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (this.state.status[a] && this.state.status[a] === this.state.status[b] && this.state.status[a] === this.state.status[c]) {
          return this.state.status[a];
        
        }
      }
      return null;
  
      }  
    
      render() {
         
        const winner = this.checkWinner(this.state.status);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;

        } else {
          status = `Next player: ${this.state.turn}`;
        }
    
        return (
          <div className="game">
          
            <div className="status"><span>{status}</span> <button onClick={this.reset} className="reset" type="submit">Reset Game</button></div>
            
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
           
        );
      }
}
 
class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      
      );
    }
  }



  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );



