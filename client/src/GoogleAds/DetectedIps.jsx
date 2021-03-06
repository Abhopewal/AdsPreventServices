import React from 'react';
import { useEffect, useState } from 'react';
import { GetApi, PostApi } from '../services/Services';
import {useSelector} from 'react-redux';

// const result = localStorage.getItem('googleAds') ? JSON.parse(localStorage.getItem('googleAds')).result : null


const DetectedIps = () => {
    const { googleAccount } = useSelector((state) => state.googleReducer);
    console.log(googleAccount)
    const [ips, setIps] = useState([]);
    const [checked, setChecked] = useState(false);
    const [resdata, resSetRes] = useState([]);
    const [resourceName, SetResourceName] = useState();

    const getCampaigns = async () => {

        PostApi(`/getcampaigns`, { GoogleAdsId:googleAccount._id }).then((data) => {
            if (data.status === true) {
                SetResourceName(data.campaigns[0].campaign.campaign.resourceName)
                resSetRes(data.campaigns)
            }
        })
    }

    const detectedIp = async () => {

        GetApi(`/detectedips`).then((data) => {
            setIps(data.result)
        })

    }

    const BlockIp = async (currentip, result, resdata) => {
        console.log("block ip data: ",currentip,result,resourceName)
        PostApi(`/exclude-ip`, { currentip, result, resourceName }).then((data) => {
            return data;
        })

    }

    const setCheck = (data, ip) => {
        BlockIp(ip, googleAccount, resdata)
    }
    useEffect(() => {
        getCampaigns()
        detectedIp()
    }, [])
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8 detectediplist">
                        <select name="" id="campdrop" onChange={(e) => SetResourceName(e.target.value)}>
                            {resdata.length > 0 ? resdata.map((data, index) => (

                                <option value={data.campaign.campaign.resourceName}>CampaignName - {data.campaign.campaign.name} </option>

                            )) : <h1>Not data found</h1>}
                        </select>
                        <div className="table-responsive table-hover mt-5">
                            <table className="table table-hover">

                                <tbody>
                                    <tr className='detecttable'>
                                        <th>S. No</th>
                                        <th scope="row" className='iplist'>Ip Address</th>
                                        <td>Threat Level</td>
                                        <td>Blocked</td>
                                        <td>Block Reason</td>
                                    </tr>

                                    {ips.length > 1 ? ips.map((data, index) => (

                                        <tr className='critical'>
                                            <th>{index + 1}</th>
                                            <th scope="row" className='iplist'>{data.ip}</th>
                                            <td>{data.weightage >= 2 ? "Critical" : "Low"}</td>
                                            <td> <label className="switch ml-3">

                                                <input type="checkbox" checked={checked[index]} onChange={(e) => setCheck(e.target.checked, data.ip)} />
                                                <span className="slider round"></span>

                                            </label></td>
                                            <td>-</td>
                                        </tr>
                                    )) : <h1>No data Found</h1>}

                                </tbody>
                            </table>
                        </div>
                      

                    </div>

                    <div className="col-md-2">

                    </div>

                </div>
            </div>

        </>
    )
}

export default DetectedIps;
