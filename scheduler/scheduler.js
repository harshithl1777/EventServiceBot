const schedule = require('node-schedule');
const { sendDailyRegistrationsReport } = require('../discord/helpers/registration.js');
const { getReportData, resetData } = require('../database/registrations.js');

const reportJob = schedule.scheduleJob({ hour: 20, minute: 30, tz: "Canada/Eastern" }, async () => {
  const { registrations, emails, total } = await getReportData();
  sendDailyRegistrationsReport(registrations, emails, total);
  await resetData();
});
