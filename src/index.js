import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i-1]}
        onClick={() => this.handleClick(i-1)}
      />
    );
}

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${this.state.xIsNext? 'X' : 'O'}`;
    }

    return (
      <div>
      <div className="status">{status}</div>
      <div className="board-row">
      {this.renderSquare(1)}
      {this.renderSquare(2)}
      {this.renderSquare(3)}
      </div>
      <div className="board-row">
      {this.renderSquare(4)}
      {this.renderSquare(5)}
      {this.renderSquare(6)}
      </div>
      <div className="board-row">
      {this.renderSquare(7)}
      {this.renderSquare(8)}
      {this.renderSquare(9)}
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
      <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
      </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a-1] && squares[a-1] === squares[b-1] && squares[a-1] === squares[c-1]) {
      return squares[a-1];
    }
  }
}
