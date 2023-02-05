import { useState } from 'react';
import './intrest.css';

const Page2=(props)=>{
    const [userInfo, SetCheckAns]= useState([]);
    
    const inputHandler=(e)=>{
        const { value, checked } = e.target;
        var game=userInfo;
        if(checked)
        {
            game.push(value);
            SetCheckAns(game);
        }
        else{
            SetCheckAns(game.filter(f=> f!==value));
        }
    }
    const page2Handler=(event)=>{
        event.preventDefault();
        props.dataHandler(userInfo);
        props.pageHandler();
    }
    return(

            <div id="games">
                            <form onSubmit={page2Handler}>
                                <h3 className="text-center">Games</h3><br/>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Adventure" type="checkbox"/> Adventure</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Board Games" type="checkbox"/> Board Games</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Cards" type="checkbox"/> Cards</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Simulation" type="checkbox"/> Simulation</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Shooting" type="checkbox"/> Shooting</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Sports" type="checkbox"/> Sports</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Stratergy" type="checkbox"/> Stratergy</label></div>
                                <div className="input-field"><label><input onChange={inputHandler}  value="Racing" type="checkbox"/> Racing</label></div><br/>
                                <div>
                                    <button  className="button-1" type="submit">Continue</button>
                                </div>
                            </form>
                 </div>
    )
}
export default Page2;