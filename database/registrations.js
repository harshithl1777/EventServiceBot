const Database = require("@replit/database");
const db = new Database();

const addToReport = async () => {
  const existingRegistrations = await db.get("dailyRegistrations");
  const existingEmailsSent = await db.get('emailsSent');
  const totalRegistrations = await db.get('totalRegistrations');
  await db.set("dailyRegistrations", existingRegistrations+1);
  await db.set("emailsSent", existingEmailsSent+1);
  await db.set('totalRegistrations', totalRegistrations+1);
  return true;
}

const getReportData = async () => {
  const registrations = await db.get("dailyRegistrations");
  const emails = await db.get('emailsSent');
  const total = await db.get('totalRegistrations');
  return { registrations, emails, total };
}

const resetData = async () => {
  await db.set("dailyRegistrations", 0);
  await db.set("emailsSent", 0);
  return true;
}

module.exports = {
  addToReport,
  getReportData,
  resetData
}