import classes from './profile.module.css';
import AvtarPreview from '../../compo/AvtarPreview';
const AvtarProfileItem=(props)=>{
    const profileHandler=()=>{
        props.onSet(props.address);
    }
    return(
        <div className={classes.avtarCont} onClick={profileHandler}>
                <AvtarPreview src={props.src}/>
        </div>
    )
}

export default AvtarProfileItem;