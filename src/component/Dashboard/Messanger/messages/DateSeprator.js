import classes from './message.module.css';
const DateSeprator=(props)=>{
    return(
        <div className={classes.DateSeprator}>
            <div className={classes.dateLabel}>{props.date}</div>
        </div>
    )
}
export default DateSeprator;