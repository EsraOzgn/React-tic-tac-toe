import './App.css';
import Board from "./Board";
import Square from "./Square";
import {useState, useEffect} from 'react';

const defaultSquares = () => (new Array(220)).fill(null);

const lines =[
  [0,1,2], [3,4,5], [6,7,8], [8,9,10],[11,12,13],[12,13,14], [14,15,16],[17,18,19],[19,20,21], [22,23,24], [25,26,27], [28,29,30], [30,31,32], [33,34,35], [36,37,38],[39,40,41],[41,42,43],[44,45,46], [47,48,49],[50,51,52],[52,53,54],[55,56,57],[58,59,60],[61,62,63],[63,64,65],[66,67,68],[69,70,71],[72,73,74],[74,75,76],[77,78,79],[80,81,82],[83,84,85],[85,86,87],[88,89,90],[91,92,93],[94,95,96],[96,97,98],[99,100,101],[102,103,104],[105,106,107],[107,108,109],[110,111,112],[113,114,115],[116,117,118],[118,119,120],[121,122,123],[124,125,126],[127,128,129],[129,130,131],[132,133,134],[135,136,137],[138,139,140],[140,141,142],[143,144,145],[146,147,148],[149,150,151],[151,152,153],[154,155,156],[157,158,159],[160,161,162],[162,163,164],[165,166,167],[168,169,170],[171,172,173],[173,174,175],[176,177,178],[179,180,181],[182,183,184],[184,185,186],[187,188,189],[190,191,192],[193,194,195],[195,196,197],[198,199,200],[201,202,203],[204,205,206],[206,207,208],[209,210,211],[212,213,214],[215,216,217],[217,218,219],
  [0,11,22], [1,12,23],[2,13,24],[3,14,25],[4,15,26],[5,16,27],[6,17,28],[7,18,29],[8,19,30],[9,20,31],[10,21,32],[33,44,55],[34,45,56],[35,46,57],[36,47,58],[37,48,59],[38,49,60],[39,50,61],[40,51,62],[41,52,63],[42,53,64],[43,54,65],[66,77,88],[67,78,89],[68,79,90],[69,80,91],[70,81,92],[71,82,93],[72,83,94],[73,84,95],[74,85,96],[75,86,97],[76,87,98],[99,110,121],[100,111,122],[101,112,123],[102,113,124],[103,114,125],[104,115,126],[105,116,127],[106,117,128],[107,118,129],[108,119,130],[109,120,131],[132,143,154],[133,144,155],[134,145,156],[135,146,157],[136,147,158],[137,148,159],[138,149,160],[139,150,161],[140,151,162],[141,152,163],[142,153,164],[165,176,187],[166,177,188],[167,178,189],[168,179,190],[169,180,191],[170,181,192],[171,182,193],[172,183,194],[173,184,195],[174,185,196],[175,186,197],[187,198,209],[188,199,210],[189,200,211],[190,201,212],[191,202,213],[192,203,214],[193,204,215],[194,205,216],[195,206,217],[196,207,218],[197,208,219]



];

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner,setWinner] = useState(null);

  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      });
    };
    const emptyIndexes = squares
      .map((square,index) => square === null ? index : null)
      .filter(val => val !== null);
    const playerWon = linesThatAre('x', 'x', 'x').length > 0;
    const computerWon = linesThatAre('o', 'o', 'o').length > 0;
    if (playerWon) {
      setWinner('x');
    }
    if (computerWon) {
      setWinner('o');
    }
    const putComputerAt = index => {
      let newSquares = squares;
      newSquares[index] = 'o';
      setSquares([...newSquares]);
    };
    if (isComputerTurn) {

      const winingLines = linesThatAre('o', 'o', null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(index => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre('x', 'x', null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre('o', null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(linesToContinue[0].filter(index => squares[index] === null)[0]);
        return;
      }

      const randomIndex = emptyIndexes[ Math.ceil(Math.random()*emptyIndexes.length) ];
      putComputerAt(randomIndex);
    }
  }, [squares]);



  function handleSquareClick(index) {
    const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = 'x';
      setSquares([...newSquares]);
    }
  }

  
  return (
    <main>
      <Board>
        {squares.map((square,index) =>
          <Square
            x={square==='x'?1:0}
            o={square==='o'?1:0}
            onClick={() => handleSquareClick(index)} />
        )}
      </Board>
      {!!winner && winner === 'x' && (
        <div className="result ">
          <b>'X' WON!</b>
        </div>
      )}
      {!!winner && winner === 'o' && (
        <div className="result ">
      <b>'O' WON!</b> 
        </div>
      )}

    </main>
  );
}

export default App;