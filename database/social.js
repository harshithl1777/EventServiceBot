const Database = require("@replit/database");
const Discord = require('discord.js');
const schedule = require('node-schedule');
const dayjs = require('dayjs');
const db = new Database();
const client = new Discord.Client();

const setSocialTime = async (id) => {
  var date = new Date();
  date.setHours(date.getHours()-3);

  const nextTime = dayjs(date).format("MMMM D, h:mm A");
  await db.set('nextSocialTime', nextTime);
  await db.set('lastCreator', id);
  return nextTime;
}

const getSocialTime = async () => {
  const next = await db.get('nextSocialTime');
  const creator = await db.get('lastCreator');
  return { next, creator };
}

client.login(process.env['DISCORD_TOKEN']);

module.exports = {
  setSocialTime,
  getSocialTime
}