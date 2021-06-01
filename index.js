const schedule = require('node-schedule');
const Discord = require('discord.js');
const { bulkSend } = require('./services/mailer.js');
const discord = require('./discord/discord.js');
const server = require('./server/server.js');
const scheduler = require('./scheduler/scheduler.js');

const client = new Discord.Client();


const job = schedule.scheduleJob({ hour: 11, minute: 20, tz: "Canada/Eastern" }, () => {
  client.channels.cache.get('844628392657813534')
  .send('@everyone **Please post your daily standup** \n Describe what you accomplished in the last 24 hours, what will be finished in the next 24 hours and any blockers.')
});

const weeklyMeetingPre = schedule.scheduleJob({
  hour: 14, minute: 30, tz: "Canada/Eastern", dayOfWeek: 0
}, () => {
  client.channels.cache.get('848768787352387617').send('@everyone Just a reminder that the **XHacks Weekly Call** starts in 5 hours at **8:30 PM**.');
});

const weeklyMeeting = schedule.scheduleJob({
  hour: 19, minute: 30, tz: "Canada/Eastern", dayOfWeek: 0
}, () => {
  client.channels.cache.get('848768787352387617').send('@everyone **XHacks Weekly Call** begins in 5 minutes. Please join the call and review the agenda details below.');
});

var rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 2);

client.login(process.env['DISCORD_TOKEN']);
