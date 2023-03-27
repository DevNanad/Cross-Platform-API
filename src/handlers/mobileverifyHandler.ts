const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



export const sendOtp = (req, res) => {
    try {
        client.verify.v2.services(process.env.TWILIO_OTP_SERVICE)
                .verifications
                .create({to: req.body.mobile_number, channel: 'sms'})
                .then(verification => {
                    console.log(verification.status)
                    res.json({status:verification})
                });
    } catch (error) {
        console.error(error);
        res.status(401).json({error:error})
    }
}


export const verifyOtp = (req, res) => {
    try {
        client.verify.v2.services(process.env.TWILIO_OTP_SERVICE)
                .verificationChecks
                .create({to: req.body.mobile_number, code: req.body.otp_code})
                .then(verification_check =>{
                    console.log(verification_check.status)
                    res.json({check_status:verification_check})
                });
    } catch (error) {
        console.error(error);
        res.status(401).json({error:error})
    }
}