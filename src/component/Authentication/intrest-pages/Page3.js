import { useState } from 'react';
import './intrest.css';
const Page3=(props)=>{
    const [userInfo, SetCheckAns]= useState([]);
    
    const inputHandler=(e)=>{
        const { value, checked } = e.target;
        var game=userInfo;
        if(checked)
        {
            game.push(value);
            SetCheckAns(game);
            props.dataHandler(game);
        }
        else{
            const newGame=game.filter(f=> f!==value);
            props.dataHandler(newGame);
            SetCheckAns(newGame);
        }
    }
    const page3Handler=(event)=>{
        event.preventDefault();
        props.pageSubmiter();
    }
    return(
        <div id="music">
                        <form onSubmit={page3Handler}>
                            <h3 className="text-center">Music</h3><br/>
                            <div className="input-field"><label><input onChange={inputHandler} value="Classical" type="checkbox"/> Classical</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Dance" type="checkbox"/> Dance</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Disco" type="checkbox"/> Disco</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Hip Hop" type="checkbox"/> Hip Hop</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Jazz" type="checkbox"/> Jazz</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Folk" type="checkbox"/> Folk</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Instrumental" type="checkbox"/> Instrumental</label></div>
                            <div className="input-field"><label><input onChange={inputHandler} value="Pop" type="checkbox"/> Pop</label></div><br/>
                            <div>
                                <button id='submit' type="submit" className="button-1">Submit</button>
                            </div>
                        </form>
        </div>
    )
};
export default Page3;