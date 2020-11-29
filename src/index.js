import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className='square'
              onClick={this.props.onClick}>
       {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, row, col) {
    return (
      <Square 
        key = {i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, row, col)}
      />
    );
}

  render() {

    return (
      <div>
      {
        [...Array(3)].map((_, i) => (
          <div key={i} className="board-row">
            {
              [...Array(3)].map((_, j) => this.renderSquare(3 * i + j, i, j))
            }
          </div>
        ))
      }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      clicked: null,
      xIsNext: true,
    }
  }

  handleClick(i, row, col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        clicked: [row, col]
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }


  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step&1) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, current.squares);

    const moves = history.map((step, move) => {
      let desc = null;
      let row = null;
      let col = null;
      let bold = (move === this.state.stepNumber ? 'bold' : null);

      if (move) {
        desc = `Go to move #${move}`;
        row = `(${this.state.history[move].clicked[0]}, `;
        col = `${this.state.history[move].clicked[1]})`;
      } else {
        desc = 'Go to game start';
      }
      return (
        <li key={move}>
          <button className={bold} onClick={() => this.jumpTo(move)}>{desc} {row} {col}</button>
        </li>
      );
    });

    let status;
    if (winner === 'draw') {
      status = `Draw. Click 'Go to game start'`;
    } else if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${this.state.xIsNext? 'X' : 'O'}`;
    }

    return (
      <div className="game">
      <div className="game-board">
      <Board 
        squares = {current.squares}
        onClick = {(i, row, col) => this.handleClick(i, row, col)}
      />
      </div>
      <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
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

function calculateWinner(squares, current) {
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

  if(current && current.includes(null) === false) {
    return 'draw';
  }
}
