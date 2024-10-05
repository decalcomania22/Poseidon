const Emailverify = require("../models/verifyemail.js");
const nodeMailer = require('nodemailer');
const emailapppass=require("./emailapppass.js");
async function generateverifyemail(email, update) {
//   const randomotpgen = () => Math.floor(1000 + Math.random() * 9000);
  const randompin=Math.floor(1000 + Math.random() * 9000);

  // Check if the email already exists and update if requested
  let verifyuser;
  if (update) {
    // randompin=randomotpgen();
    verifyuser = await Emailverify.findOneAndUpdate(
        { email: email }, // Match criteria
        { $set: { otp: randompin, expires: Date.now() + 10 * 60 * 1000 } },
        {new:true}
    );
    // await verifyuser.save();
  } else {
    // randompin=randomotpgen();
    verifyuser = new Emailverify({
      email: email,
      otp: randompin,
      expires: Date.now() + 1 * 60 * 1000,
    });
    await verifyuser.save();
  }
  console.log("OTP generated: ", verifyuser);

  // Send OTP email
  async function sendOTP() {
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'rajnesh34698@gmail.com',
        pass: emailapppass // Use your app-specific password here
      }
    });

    const info = await transporter.sendMail({
      from: '"Rajnesh" <rajnesh34698@gmail.com>',
      to: email,
      subject: 'Verify your email - OTP',
      html: `
        <h1>Hello User</h1>
        <p>Your new OTP is: <b>${randompin}</b></p>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    console.log("Message sent: " + info.messageId);
  }

  // Send the email and handle errors
  await sendOTP().catch(e => console.log(e));

  // Return the verifyuser ID for further use
  return verifyuser._id;
}

module.exports = generateverifyemail;