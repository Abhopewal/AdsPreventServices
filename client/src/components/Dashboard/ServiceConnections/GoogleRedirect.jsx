import axios from 'axios';
import React, {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import getheader from '../../../config/getHeader';
import instance from '../../../http/axios'

const GoogleRedirect = () => {

    const navigate = useNavigate();

    const code = new URL(window.location.href).searchParams.get('code');

    const sendValue = async (code) => {
       
        let data = {
            code : code 
        }
       let res = await instance.post('/google-code' , data)

       console.log(res);
       if(res.data.LinkGoogle === true ) {
     
        localStorage.setItem("LinkGoogle",res.data.LinkGoogle);
        navigate("/dashboard/fraudanalyticsgoogle");
        
       }
    }

    useEffect(()=>{
        sendValue(code);
    },[])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5">

                    </div>
                    <div className="col-2 mt-5">
                        <h4>Loading...</h4>
                    </div>
                    <div className="col-5">

                    </div>
                </div>
            </div>
        </>
    )
}

export default GoogleRedirect;