import prisma from "../db";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


//SENT OTP 
export const sendOtp = async (req, res) => {
    try {
        // Check the database if the user number is taken
        const findNumber = await prisma.user.findUnique({
            where: { mobile_number: req.body.mobile_number },
        });
      
        // Check if mobile number is already taken
        if (findNumber) {
            // Send error message
            throw new Error("Mobile Number is Taken");
        } else {
            // Check if mobile number is valid (should be Philippine number)
            const lookup = await client.lookups
            .v2.phoneNumbers(req.body.mobile_number)
            .fetch();
            const countryCode = lookup.countryCode;
            if (countryCode !== "PH") {
            throw new Error("Invalid phone number. Please provide a valid Philippine phone number.");
            }
        
            // Send OTP
            const verification = await client.verify
            .v2.services(process.env.TWILIO_OTP_SERVICE)
            .verifications.create({ to: req.body.mobile_number, channel: "sms" });
            console.log(verification.status);
        
            // Send success message
            res.json({ message: "OTP sent to mobile number." });
        }
    } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
    }

}

//VERIFY OTP
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