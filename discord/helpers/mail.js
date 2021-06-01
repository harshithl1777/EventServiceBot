const Discord = require('discord.js');
const Database = require("@replit/database")

const db = new Database();

const createLoadingEmbed = (numOfEmails, id) => {
  const sendingEmbed = new Discord.MessageEmbed()
  .setColor('#ffbf00')
  .setTitle('Bulk Email Process Initiated')
  .setDescription(`I\'m initiating the bulk email process. This **might take a bit of time** depending on the number of emails that need to be sent so just lean back and relax. **I\'ll ping you once the process is over!**`)
  .addField('Request Creator', `<@!${id}>`, true)
  .addField('Emails Queued', numOfEmails, true)
  .setTimestamp()
  .setFooter('XHacker Bot © XHacks 2021');
  return sendingEmbed;
}

const createSuccessEmbed = (success, fail, id) => {
  const sendingEmbed = new Discord.MessageEmbed()
  .setColor('#20b2aa')
  .setTitle('Bulk Email Process Finished')
  .setDescription(`The bulk email process has just finished. Please see the **results** below.`)
  .addField('Request Creator', `<@!${id}>`, true)
  .addField('Emails Sent', success, true)
  .addField('Emails Failed', fail, true)
  .setTimestamp()
  .setFooter('XHacker Bot © XHacks 2021');
  return sendingEmbed;
}

const createErrorEmbed = (error, id) => {
  const sendingEmbed = new Discord.MessageEmbed()
  .setColor('#f94343')
  .setTitle('Bulk Email Process Failed')
  .setDescription(`The bulk email process has failed. Please see the **errors** below.`)
  .addField('Request Creator', `<@!${id}>`, true)
  .addField('Error', error)
  .setTimestamp()
  .setFooter('XHacker Bot © XHacks 2021');
  return sendingEmbed;
}

module.exports = {
  createLoadingEmbed,
  createSuccessEmbed,
  createErrorEmbed
};