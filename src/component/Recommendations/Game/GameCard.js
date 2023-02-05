import classes from './game.module.css';
import { useNavigate } from 'react-router-dom';
const GameCard = ({game}) => {
    const navigate=useNavigate();
    const handler=()=>{
        
        if(game.name==='Tic Tac Toe')
        {
            navigate('/Dashboard/game/tic-tac-toe');
        }
        else if(game.name==='Space Snake')
        {

        }
    }
    return (
        <div onClick={handler} className={classes.Main_Card}>
            (
                <img
                    src={game.image}
                    alt={game.name}
                    title={game.name}
                    className={classes.Poster}
                />
            )
            <div className={classes.Movie_Title}>{game.name}</div>        
        </div>
    );
};

export default GameCard;
