const Discord = require('discord.js');

const client = new Discord.Client();

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
  const dailyReportEmbed = new Discord.MessageEmbed()
    .setColor('#20b2aa')
    .setTitle('Daily Registration Report')
    .setDescription(`Here's your daily registration report, including the number of new registrations, the number of total registrations and the number of emails successfully sent.`)
    .addField('New Registrations', registrations, true)
    .addField('Emails Sent', emails, true)
    .addField('Total Registrations', total, true)
    .setThumbnail('https://i.imgur.com/xd7YF4u.png')
    .setTimestamp()
    .setFooter('XHacker Bot © XHacks 2021');
  client.channels.cache.get('845351774508023859').send('@everyone Please see today\'s registration report below:')
  client.channels.cache.get('845351774508023859').send(dailyReportEmbed);
}

client.login(process.env['DISCORD_TOKEN']);

module.exports = {
  sendRegistrationNotification,
  sendDailyRegistrationsReport
}