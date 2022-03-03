import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import getheader from '../../../config/getHeader';
import instance from '../../../http/axios'
import Services from '../../../services/services';
import GoogleClientIdModal from '../../Modals/GoogleClientIdModal';


const GoogleRedirect = () => {


    const navigate = useNavigate();

    const code = new URL(window.location.href).searchParams.get('code');

    const [modalIsOpen, setIsOpen] = useState(false);
    const [clientDetails, setClientDetails] = useState([]);
    const [refreshToken,setRefreshToken] = useState();
    const openModal = () => {
        setIsOpen(true)
    }

    const sendValue = async (code) => {


        const res = await Services.GoogleAdsSetup(code)

        console.log("resdata: ", res.data.accounts);
        if (res.data.status === true) {
            setClientDetails(res.data.accounts)
            setRefreshToken(res.data.refreshToken)
            openModal()
        }
        // else if (res.data.staus !== true) {
        //     navigate('/subscription')
        // }
        // else {
        //     setNotfound("Google ads Account Not found")
        // }
    }

    useEffect(() => {
        if (code) {
            sendValue(code)
        }

    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5">

                    </div>
                    <div className="col-2 mt-5">
                        <h1>Loading...</h1>
                        <GoogleClientIdModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} clientDetails={clientDetails} refreshToken={refreshToken}/>
                    </div>
                    <div className="col-5">

                    </div>
                </div>
            </div>
        </>
    )
}

export default GoogleRedirect;