const nodemailer = require('nodemailer');
const { generateHelperEmail, generateParticipantEmail } = require('./mailHtml.js');

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  auth: {
    user: 'yadu@xhacks.ca',
    pass: process.env['YADU_PW']
  },
});

const transporter2 = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  auth: {
    user: 'team@xhacks.ca',
    pass: process.env['TEAM_MAIL_PW']
  },
});

const bulkSend = async (message) => {
  const { err } = await transporter.sendMail(message);
  if (err) throw err;
  return true;
}

const sendRegistrationEmail = async(first, email) => {
  const message = {
    from: "XHacks <team@xhacks.ca>",
    to: email,
    subject: "Thanks for registering for XHacks!",
    html: generateParticipantEmail(first)
  };
  const { err } = await transporter2.sendMail(message);
  if (err) throw err;
  return '200 OK - Sent';
}

const sendHelperSignupEmail = async(first, email, type) => {
  const message = {
    from: "XHacks <team@xhacks.ca>",
    to: email,
    subject: `Thanks for signing up to ${type} at XHacks!`,
    html: generateHelperEmail(first, type)
  };
  const { err } = await transporter2.sendMail(message);
  if (err) throw err;
  return '200 OK - Sent';
}

module.exports = { 
  bulkSend,
  sendRegistrationEmail,
  sendHelperSignupEmail
};