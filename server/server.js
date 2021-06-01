const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Discord = require('discord.js');
const client = new Discord.Client();
const { sendRegistrationNotification } = require('../discord/helpers/registration.js');
const { addToReport, getReportData, resetData } = require('../database/registrations.js');
const { addNewContact } = require('../services/sendgrid.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/typeform', async (req, res) => {
  const answers = req.body.form_response.answers;
  res.sendStatus(200);
  const name = `${answers[0].text} ${answers[1].text}`;
  const source = answers[answers.length-1].choice.label;
  await addNewContact(answers[2].email, answers[0].text, answers[1].text);
  const emailStatus = '200 OK - Sent';
  sendRegistrationNotification(name, source, emailStatus);
  await addToReport();
});

client.login(process.env['DISCORD_TOKEN']);

app.listen(3000, () => console.log('Listening on port 3000'));