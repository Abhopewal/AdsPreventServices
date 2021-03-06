import React from 'react'
import { useEffect } from 'react'
import { GetApi, saveGoogleData } from '../../../../services/Services';
import { GOOGLE_ADS_SUCCESS } from '../../../../features/actions-types';
import { useDispatch } from 'react-redux';
const GoogleServiceConnection = () => {
    const dispatch = useDispatch();
    const checkAccountExist = () =>{
        GetApi(`googleaccountexist`).then((data)=>{
            if(data.status===true){
                console.log("from starting,",data)
                saveGoogleData(data.result);
                dispatch({type:GOOGLE_ADS_SUCCESS,payload:data.result})
            }

        })
    }

    // useEffect(()=>{
    //     checkAccountExist()
    // },[])
    return (
        <>
            <div className="container">
                <div className='text-center mt-4'>
                    <h2>Let's get protected</h2>
                    <p>Connect your Google Ads account or MCC for automatic IP detection and blocking</p>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="google-div gm_common">
                            <h2>Connect with Google</h2>
                            <p>Link your email and in the following step
                                sync the relevant Google Ads account</p>
                            <a href={process.env.REACT_APP_GOOGLE_AUTH_URL}><button className='service-btn'> Link with Google </button></a>
                        </div>
                    </div>

                    <div className="col-md-6 gm_common">
                        <div className="manual-div ">
                            <h2>Link Manually</h2>
                            <p>Submit your Google Ads account or MCC
                                and access request to get connected</p>
                        </div>
                        <div className='manual-input'>
                            <input type="text" placeholder='123-456-7890' id='google_id' />
                            <button className='service-btn'>Connect Googel Ads Account</button>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default GoogleServiceConnection;
