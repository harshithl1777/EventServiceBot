const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  auth: {
    user: 'harshith@xhacks.ca',
    pass: process.env['HARSHITH_PW']
  },
});

const bulkSend = async (message) => {
  const { err } = await transporter.sendMail(message);
  if (err) throw err;
  return true;
}

module.exports = { 
  bulkSend,
};