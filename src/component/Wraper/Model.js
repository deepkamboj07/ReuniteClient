import { Fragment } from "react"
import  ReactDOM from "react-dom";

const ModelOverlay=(props)=>{
    <div className="model">
        {props.children}
    </div>
}

const portel=document.getElementById('notification');
const Model=(props)=>{
    return(
        <Fragment>
            {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,portel)}
        </Fragment>
    )
}
export default Model;