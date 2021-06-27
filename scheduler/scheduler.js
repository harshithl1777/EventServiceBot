const schedule = require('node-schedule');
const { sendDailyRegistrationsReport } = require('../discord/helpers/registration.js');
const { getReportData, resetData } = require('../database/registrations.js');

const reportJob = schedule.scheduleJob({ hour: 21, minute: 0, tz: "Canada/Eastern" }, async () => {
  const { registrations, emails, total } = await getReportData();
  sendDailyRegistrationsReport(registrations, emails, total);
  await resetData();
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