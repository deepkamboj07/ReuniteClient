import { useState } from 'react';
import Page1 from './intrest-pages/Page1';
import Page2 from './intrest-pages/Page2';
import Page3 from './intrest-pages/Page3';
import { sendIntres } from './auth';

const Intrest=(props)=>{
    const [page, setPage]= useState(1); 
    const [intrestData, setIntrestData]=useState({
        movies:[],
        music:[],
        games:[]
    }); 

    const pageHandler2=()=>{
        setPage(2);
    }   
    const pageHandler3=()=>{
        setPage(3);
    }   
    const fetchIntrestMovies=(data)=>
    {
        const {music,games}=intrestData;
        setIntrestData({
            movies:data,
            music:music,
            games:games
        });
    }
    const fetchIntrestGames=(data)=>
    {
        const {movies,music}=intrestData;
        setIntrestData({
            movies:movies,
            music:music,
            games:data
        });
    }
    const fetchIntrestMusic=(data)=>
    {
        const {movies,games}=intrestData;
        setIntrestData({
            movies:movies,
            music:data,
            games:games
        });
    }

    const formSubmiter=()=>{
        sendIntres(props.userid, intrestData).then(res=>{
            if(res.status===201)
            {
                props.sucess();
                props.SignUp();
            }
        });
    }
    return(
        <div className="body-wrapper">
            <div className="container">
            <h1 className='text-center'>Choose your Interest</h1>
                <div className="row justify-content-center">
                    <div className="col-xl-4 meriCla">
                        {page===1 && <Page1 dataHandler={fetchIntrestMovies} pageHandler={pageHandler2}/>}
                        {page===2 && <Page2 dataHandler={fetchIntrestGames} pageHandler={pageHandler3}/>}
                        {page===3 && <Page3 dataHandler={fetchIntrestMusic} pageSubmiter={formSubmiter}/>}
                    </div>
                    </div>
            </div>
        </div>
    );
}

export default Intrest;