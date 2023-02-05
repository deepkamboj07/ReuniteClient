// This is the movie card component
import classes from './music.module.css';
const MusicCard = ({ song , selectHandler, selectMusicHandler,id}) => {

    const handler=()=>{
        selectMusicHandler(null);
        setTimeout(()=>{
            selectMusicHandler(song.song_id);
        },10);
        selectHandler();
    }
    return (
        <div onClick={handler} className={classes.Main_Card}>
            {song.image_url && (
                <img
                    src={song.image_url}
                    alt={song.song_name}
                    title={song.song_name}
                    className={classes.Poster}
                />
            )}
            <div className={classes.Movie_Title}>{song.song_name}</div>           
        </div>
    );
};

export default MusicCard;
