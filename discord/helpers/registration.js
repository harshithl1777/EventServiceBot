const Discord = require('discord.js');

const client = new Discord.Client();

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}


const sendRegistrationNotification = (name, source, emailStatus) => {
  const newRegistrationEmbed = new Discord.MessageEmbed()
    .setColor('#20b2aa')
    .setTitle('New Typeform Registration')
    .setDescription(`**${name}** just registered on our typeform and the registration has been logged into Notion. **See other info below.**`)
    .addField('Referred From', source, true)
    .addField('Email Status', emailStatus, true)
    .setThumbnail('https://i.imgur.com/xd7YF4u.png')
    .setTimestamp()
    .setFooter('XHacker Bot © XHacks 2021');
  client.channels.cache.get('845351774508023859').send(newRegistrationEmbed);
}

const sendDailyRegistrationsReport = (registrations, emails, total) => {
  const check = (registrations >= 14) ? '✅' : (registrations === 12 || registrations === 13) ? '🆗' : '❌';
  const dailyReportEmbed = new Discord.MessageEmbed()
    .setColor('#20b2aa')
    .setTitle('Daily Registration Report')
    .setDescription(`Here's your daily registration report, including the number of new registrations, the number of total registrations and the number of emails successfully sent.`)
    .addField('New Registrations', registrations, true)
    .addField('Total Registrations', total, true)
    .addField('Goal Reached', check, true)
    .setThumbnail('https://i.imgur.com/xd7YF4u.png')
    .setTimestamp()
    .setFooter('XHacker Bot © XHacks 2021');
  client.channels.cache.get('845351774508023859').send('@everyone Please see today\'s registration report below:')
  client.channels.cache.get('845351774508023859').send(dailyReportEmbed);
}

const getRegistrationStatus = (registrations, emails, total) => {
  const registrationStatusEmbed = new Discord.MessageEmbed()
    .setColor('#2C4BF9')
    .setTitle('Current Registrations Status')
    .setDescription(`Here's the current registration status, including the number of new registrations, total registrations and number of emails successfully sent.`)
    .addField('New Registrations', registrations, true)
    .addField('Emails Sent', emails, true)
    .addField('Total Registrations', total, true)
    .setThumbnail('https://i.imgur.com/xd7YF4u.png')
    .setTimestamp()
    .setFooter('XHacker Bot © XHacks 2021');
  return registrationStatusEmbed;
}

const sendErrorReport = (err) => {
  const errorEmbed = new Discord.MessageEmbed()
    .setColor('#f94343')
    .setTitle('Error Detected in Registration Flow')
    .setDescription(`There was an error reported while a participant was trying to register. The error is noted below.`)
    .addField('Error Message', err)
    .setTimestamp()
    .setFooter('XHacker Bot © XHacks 2021');
  client.channels.cache.get('845351774508023859').send(errorEmbed);
}

const sendHelpRegistered = (type) => {
  const newRegistrationEmbed = new Discord.MessageEmbed()
    .setColor('#20b2aa')
    .setTitle(`New ${toTitleCase(type)} Signup`)
    .setDescription(`A new **${type}** has just signed up on our typeform and the details have been logged into Notion.`)
    .setTimestamp()
    .setFooter('XHacker Bot © XHacks 2021');
  client.channels.cache.get('845351774508023859').send(newRegistrationEmbed);
}
client.login(process.env['DISCORD_TOKEN']);

module.exports = {
  sendRegistrationNotification,
  sendDailyRegistrationsReport,
  sendErrorReport,
  sendHelpRegistered,
  getRegistrationStatus
}