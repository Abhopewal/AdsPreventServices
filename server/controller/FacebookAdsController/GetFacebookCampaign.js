
const bizSdk = require('facebook-nodejs-business-sdk');
const FacebookAds = require("../../model/FacebookAds");
const GetFacebookCampaign = async (req, res) => {
    try {
       
        const { account_id } = req.body;

        console.log("facebook camp body",req.body)
        if (!account_id) {
            return res.status(200).json("account_id must be set in body")
        }

        const result = await FacebookAds.findOne({ account_id: account_id });

        const AdAccount = bizSdk.AdAccount;
        const Campaign = bizSdk.Campaign;
        const access_token = result.access_Token // "EAAJjbBz7b7YBAEm3Lp5ATwyzsmX2k2PT79RKdxF2RicdZANzIRSGRZBhMfjUUNP8kqL4qLhBEC18B7Yw8wMZAG1ZC2vAdZBZAJMCSEY6C3mAI0EVorWW6hr0FmhYAl0xCRW6zC2N3Sd9Kam9dj6FR5MMXvtWQLmVBAwAMCGLLoKpMZAcPOau21faDyHh4loB18ZD";
        const id = account_id//"act_2211157139048409";
        const app_secret = process.env.FACEBOOK_APP_SECRET;
        const app_id = process.env.FACEBOOK_APP_ID;

        const api = bizSdk.FacebookAdsApi.init(access_token);
        const showDebugingInfo = true;
        if (showDebugingInfo) {
            api.setDebug(true);
        }
        let fields, params;
        fields = [
            'name',
            'objective',
            "account_id",
            "daily_budget",
            "status",
            "start_time",
            "created_time",
            "spend_cap",
            "source_campaign",
            "stop_times"
        ];
        params = {
            'effective_status': ['ACTIVE', 'PAUSED'],
        };
        const campaigns = await (new AdAccount(id)).getCampaigns(
            fields,
            params
        );

        const camp = []
        for (let i = 0; i < campaigns.length; i++) {
            console.log("campaign", campaigns[i]._data)
            camp.push(campaigns[i]._data)
        }
        return res.status(200).json({ status: true, camp })
    } catch (error) {
        return res.status(200).json(error)
    }

}
module.exports = GetFacebookCampaign;


// { "excluded_geo_locations": { "regions": [{ "key": "3847" }] }, "geo_locations": { "countries": ["US"] } }

// {"excluded_geo_locations": {"countries": ["US"]}}