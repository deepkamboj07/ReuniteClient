import { Fragment } from 'react';
import classes from './avtar.module.css';

const AvtarPreview=(props)=>{
    return(
            <Fragment>
            {
                (props.src && !props.Big && !props.icon) && (
                    <div className={classes.avtarImage}>
                        <img src={props.src} alt='avtar'/>
                    </div>
                )
            }
            {
                (props.src && props.Big) && (
                    <div className={classes.avtarBigImage}>
                        <img src={props.src} alt='avtar'/>
                    </div>
                )
            }
            {
                (props.src && props.icon===true)&&(
                    <div className={classes.avtarIcon}>
                        <img src={props.src} alt='avtar'/>
                    </div>
                )
            }
            {
                    (!props.src && props.large===false)&&(
                    <div className={classes.avtar}>
                        {props.username.substring(0,2)}
                    </div>
                    )
            }
            {
                (props.large===true) &&((
                        <div className={`${classes.avtarLarge}`}>
                            {props.username.substring(0,2)}
                        </div>
                    ))
            }
            {
                (props.extraLarge===true)&&<div className={`${classes.avtarExtraLarge}`}>
                            {props.username.substring(0,2)}
                        </div>
            }
            </Fragment>
    )
}
export default AvtarPreview;