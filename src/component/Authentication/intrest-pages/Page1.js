import { useState } from 'react';
import './intrest.css';
const Page1=(props)=>{
    const [userInfo, SetCheckAns]= useState([]);
    
    const inputHandler=(e)=>{
        const { value, checked } = e.target;
        var movies=userInfo;
        if(checked)
        {
            movies.push(value);
            SetCheckAns(movies);
        }
        else{
            SetCheckAns(movies.filter(f=> f!==value));
        }
    }
    const page1Handler=(event)=>{
        event.preventDefault();
        props.dataHandler(userInfo);
        props.pageHandler();
    }
    return(
        <div id='movies'>
            <div className="form text-center">
            <h3 className="text-center">Movies</h3><br/>
            <form onSubmit={page1Handler}>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Action' type="checkbox"/> Action</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Adventure' type="checkbox"/> Adventure</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Comedy' type="checkbox"/> Comedy</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Horror' type="checkbox"/> Horror</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Drama' type="checkbox"/> Drama</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Science Fiction' type="checkbox"/> Science Fiction</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Romentic' type="checkbox"/> Romantic</label></div>
                <div className="input-field"><label><input name='movies' onChange={inputHandler} value='Thriller' type="checkbox"/> Thriller</label></div><br/>
                <div>
                    <button className="button-1" type='submit'>Continue</button>
                </div>  
            </form>
            </div>
        </div>
    )
}
export default Page1;