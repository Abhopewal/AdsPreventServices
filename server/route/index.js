const route = require("express").Router()
const auth = require("../middleware/auth");
const subs = require("../middleware/subs");
const authController = require("../controller/authController");
const accountController = require("../controller/accountController");
const googleAdsController = require("../controller/GoogleAdsController");
const facebookAdsController = require("../controller/FacebookAdsController");
const ipController = require("../controller/ipController");
const commonController = require("../controller/commonController");
const paymentGatwayController = require("../controller/paymentGatwayController");
const practice = require('../controller/commonController/practice');

route.post('/practice',practice);


//commom routes
route.post('/auth/register', authController.localRegister);
route.post('/auth/login', authController.localLogin);
route.post('/domain', auth, accountController.addDomain);
route.get('/countries',auth,commonController.Countrie);
route.post('/searchcountry',auth,commonController.SearchCountry);
route.get('/vinscout.js',commonController.MainScript);
route.get('/generatescript',commonController.GenerateScript);
route.post('/receiveclietdata',commonController.Receiveclietdata)
route.post('/getstates',commonController.GetStates)

//google ads
route.post('/google-setupads',auth, googleAdsController.SetupGoogleAds);
route.post('/google-managerid',auth,googleAdsController.GetManagerId);
route.post('/google-client',auth,googleAdsController.GoogleClient);
route.post('/exclude-ip',auth,googleAdsController.ExcludeIp);
route.post('/getcampaigns',auth,googleAdsController.GetCampaigns);
route.get('/googleaccountexist',auth,googleAdsController.GoogleAccountExist);

//facebook ads
route.post('/facebookad',auth,facebookAdsController.FacebookAdSetup);
route.post('/setupfacebook',auth,facebookAdsController.GetFacebookData);
route.post('/facebookcampaigns',auth,facebookAdsController.GetFacebookCampaign);
route.post('/facebookadsets',auth,facebookAdsController.GetFacebookAdSets);
route.post('/excludecountry',auth,facebookAdsController.ExcludeCountry);

//google auth
route.post('/auth/google', authController.googleOauth);

//facebook auth
route.post('/auth/facebook', authController.facebookOauth);


//Ip routes
route.get('/spamhausip', ipController.SpamhausIp);
route.get('/myip-ms', ipController.myip);
route.get('/detectedips',ipController.DetectedIps);
route.post('/blockiplist',ipController.BlockedIplist);


//Payment Gateway
route.post('/payment/subscription89',paymentGatwayController.Subscription_89);
route.post('/payment/subscription59',paymentGatwayController.Subscription_59);
route.post('/payment/subscription49',paymentGatwayController.Subscription_49);
route.post('/payment/verification',paymentGatwayController.PaymentVerification);




module.exports = route;


