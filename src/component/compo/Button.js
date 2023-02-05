const Button = ({ resetGame }) => {
    return <button style={{width:'200px'}} onClick={() => resetGame()}>New Game</button>;
};

export default Button;