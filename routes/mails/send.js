
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SANDGRID_API_KEY)



const sendMailVerificationMessage =  function (email,name,token) {
      let url =  `http://localhost:5000/api/users/verifi?token=${token}`;
    const msg = {
        to:  email,
        from: 'raghvendra.mishra027@gmail.com',
        subject: 'HotClix Mail Verificaion',
        text: 'Verify EMail',
        html: `<h1 style="color: indianred">Click on to this link to verify your Mail</h1><br> <a href=${url}> Click Here to verify</a>`

    }
    sgMail.send(msg).then(()=>{
        console.log("Verification mail send successfully");
    }).catch(e =>{
        console.log("Error in sending the user weldome message "+ e);
    })
}


module.exports = {
    sendMailVerificationMessage,


}