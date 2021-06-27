const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Discord = require('discord.js');
const client = new Discord.Client();
const { sendRegistrationNotification, sendErrorReport, sendHelpRegistered } = require('../discord/helpers/registration.js');
const { addToReport, getReportData, resetData } = require('../database/registrations.js');
const { sendRegistrationEmail, sendHelperSignupEmail } = require('../services/mailer.js');
const { addRegistration } = require('../services/notion.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/participants', async (req, res) => {
  try {
      const answers = req.body.form_response.answers;
  res.sendStatus(200);
  const name = `${answers[0].text} ${answers[1].text}`;
  const source = answers[6].choice.label;
  const data = {
    name: `${answers[0].text} ${answers[1].text}`,
    email: answers[2].email,
    grade: answers[3].choice.label,
    exp: answers[4].choice.label,
    links: answers[5].text,
    referred: answers[6].choice.label,
  };
  const emailStatus = await sendRegistrationEmail(answers[0].text, answers[2].email);
  sendRegistrationNotification(name, source, emailStatus);
  await addRegistration(data);
  await addToReport(answers[6].choice.label);
  } catch(err) {
    sendErrorReport(err);
  }
});

app.post('/helpers', async (req, res) => {
  try {
    const answers = req.body.form_response.answers;
    const name = `${answers[0].text}`;
    res.sendStatus(200);
    await sendHelperSignupEmail(name, answers[2].email, (req.query.type !== 'speaker') ? req.query.type : 'speak');
    sendHelpRegistered(req.query.type);
  } catch(err) {
    console.log(err);
    sendErrorReport(err);
  }
});

client.login(process.env['DISCORD_TOKEN']);

app.listen(3000, () => console.log('Listening on port 3000'));