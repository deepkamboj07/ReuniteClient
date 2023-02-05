import classes from './appbar.module.css';
const TypingIndicator=()=>{
    return(
        <div className={classes.typing}>
           ( Typing
            <div className={`spinner-grow text-info ` + classes.indicator} role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className={`spinner-grow text-info ` + classes.indicator} role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className={`spinner-grow text-info ` + classes.indicator} role="status">
                <span className="sr-only">Loading...</span>
            </div> &nbsp;&nbsp;)        
        </div>
    )
}
export default TypingIndicator;