const accountSid = 'ACd2501210e190bcaf2573743341408a40';
const authToken = 'bae7a8a6d7bacf3b3acfc0efe01153a3';
const twilioNumber = '+18064294191';

const twilio = require('twilio')(accountSid, authToken);

const sendOTP=(phoneNumber, otp)=> {
    console.log(phoneNumber,otp)
    const message = `Your OTP is: ${otp}`;

    twilio.messages
        .create({
            body: message,
            from: twilioNumber,
            to: phoneNumber
        })
        .then(message => console.log(`OTP sent: ${message.sid}`))
        .catch(error => console.error(`Error sending OTP: ${error.message}`));
}

module.exports=sendOTP