import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import classes from './ticTac.module.css';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Buttonn from "../../../compo/Button";
import Square from '../../../compo/Square';

export default function TicTac(props) {

    const navigate=useNavigate();
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [audio, setAudio]=useState(false);
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);

    let audioTurn = new Audio('http://localhost:5002/profile/ting.mp3');
    let gameOver = new Audio('http://localhost:5002/profile/gameover.mp3');
    const checkEndTheGame = () => {
        for (let square of squares) {
            if (!square) return false;
        }
        return true;
    };

    const checkWinner = () => {
        const combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of combos) {
            const [a, b, c] = combo;
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const updateSquares = (ind) => {
        if (squares[ind] || winner) {
            return;
        }
        audioTurn.play();
        const s = squares;
        s[ind] = turn;
        setSquares(s);
        setTurn(turn === "x" ? "o" : "x");
        const W = checkWinner();
        if (W) {
            audioTurn.pause();
            gameOver.play();
            setWinner(W);
        } else if (checkEndTheGame()) {
            gameOver.play();
            setWinner("x | o");
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setTurn("x");
        setWinner(null);
    };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        className={classes.selectedMovie}
        fullScreen
      >
      <AppBar sx={{ position: 'relative' ,backgroundColor:'#0f1011', color:'white'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>navigate('/dashboard')}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, display:'flex', alignItems:'center' , justifyContent:'center'}} variant="h6" component="div">
                Tic Tac Toe
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className={classes.selectedMovie_cont + ' ' + classes.DialogContent}>
        <div className="tic-tac-toe">
            <Buttonn resetGame={resetGame} />
            <div className="game">
                {Array.from("012345678").map((ind) => (
                    <Square
                        key={ind}
                        ind={ind}
                        updateSquares={updateSquares}
                        clsName={squares[ind]}
                    />
                ))}
            </div>
            <div className={`turn ${turn === "x" ? "left" : "right"}`}>
                <Square clsName="x" />
                <Square clsName="o" />
            </div>

            <AnimatePresence>
                {winner && (
                    <motion.div
                        key={"parent-box"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="winner"
                    >
                        <motion.div
                            key={"child-box"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="text"
                        >
                            <motion.h2
                                initial={{ scale: 0, y: 100 }}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        y: { delay: 0.7 },
                                        duration: 0.7,
                                    },
                                }}
                            >
                                {winner === "x | o"
                                    ? "No Winner :/"
                                    : "Win !! :)"}
                            </motion.h2>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.3,
                                        duration: 0.2,
                                    },
                                }}
                                className="win"
                            >
                                {winner === "x | o" ? (
                                    <>
                                        <Square clsName="x" />
                                        <Square clsName="o" />
                                    </>
                                ) : (
                                    <>
                                        <Square clsName={winner} />
                                    </>
                                )}
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: { delay: 1.5, duration: 0.3 },
                                }}
                            >
                                <Buttonn resetGame={resetGame} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}