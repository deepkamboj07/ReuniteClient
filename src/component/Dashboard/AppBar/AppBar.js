import classes from './appbar.module.css';
import DropDownMenu from './DropDownMenu';
import ChoosenOptionLabel from './ChoosenOptionLabel';
const AppBar=(props)=>{
    return(
        <div className={classes.appbar}>
            <ChoosenOptionLabel/>
            <DropDownMenu logout={props.logout}/>
        </div>
    )
}
export default AppBar;