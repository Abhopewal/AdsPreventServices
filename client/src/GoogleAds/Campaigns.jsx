import React from 'react'
import { useEffect, useState } from 'react'
import { PostApi } from '../services/Services'
import {useSelector} from 'react-redux';

const Campaigns = () => {
    
    const { googleAccount } = useSelector((state) => state.googleReducer);
    const [resdata, resSetRes] = useState([]);

    const getCampaigns = async (GoogleAdsId) => {
        PostApi(`/getcampaigns`,{GoogleAdsId}).then((data)=>{
            if (data.status === true) {
                resSetRes(data.campaigns)
            }
        })

    }

    useEffect(() => {
        getCampaigns(googleAccount._id)
    }, [])

    return (
        <>
        
            <div className="container mt-3">
                {resdata.length > 0 ? resdata.map((data, index) => (
                   
                    <div className="row mt-4">
                        {console.log("data",data)}
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8 detectediplist" >

                            <div>
                                <table className="table table-hover">

                                    <tbody>
                                        <tr className='detecttable'>
                                            <th>Name</th>
                                            <td>{data.campaign.campaign.name}</td>
                                        </tr>
                                        <tr className='detecttable'>
                                            <th>resourceName</th>
                                            <td>{data.campaign.campaign.resourceName}</td>
                                        </tr>
                                        <tr className='detecttable'>
                                            <th>Status</th>
                                            <td>{data.campaign.campaign.status}</td>
                                        </tr>
                                        <tr className='detecttable'>
                                            <th>servingStatus</th>
                                            <td>{data.campaign.campaign.servingStatus}</td>
                                        </tr>
                                        <tr className='detecttable'>
                                            <th>id</th>
                                            <td>{data._id}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="col-md-2">
                            </div>
                        </div>
                        <div className="col-md-3">
                        </div>

                    </div>
                )):<h1>Not data found</h1> }


            </div>
        </>
    )
}

export default Campaigns;