const Discord = require('discord.js');
const { commands } = require('./commands.json');
const discordMail = require('./helpers/mail.js');
const { setSocialTime, getSocialTime } = require('../database/social.js');
const { getRegistrationStatus } = require('./helpers/registration.js');
const { getReportData, resetData } = require('../database/registrations.js');

const client = new Discord.Client();
const guildID = '813918134678585344';

client.on('ready', () => {
  commands.forEach(cmd => {
    client.api.applications(client.user.id).guilds(guildID).commands.post({
      data: cmd
    });
  });
  
  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const id = interaction.member.user.id;
      switch (command) {
      case 'registration_status':
        const { registrations, emails, total, socialTotal, otherTotal } = await getReportData();
        const statusReport = getRegistrationStatus(registrations, emails, total, socialTotal, otherTotal);
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: { embeds: [statusReport] }
          }
        });
        break
      case 'new_post':
        const optionData = interaction.data.options;
        const notes = (optionData[4]) ? optionData[4].value : 'N/A';
        const newPostEmbed = new Discord.MessageEmbed()
        .setColor('#20b2aa')
        .setTitle(`New Post in ${optionData[0].value} server`)
        .setDescription(`A new post has been made in a server (channel **#${optionData[1].value}**)`)
        .addField('Creator', `<@!${id}>`, true)
        .addField('@Everyone?', `${(optionData[2].value) ? 'Yes' : 'No'}`, true)
        .addField('Member Count', optionData[3].value, true)
        .addField('Notes', notes)
        .setTimestamp()
        .setFooter('XHacker Bot © XHacks 2021');
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: { embeds: [newPostEmbed] }
          }
        });
        break
    }
  });
});

client.login(process.env['DISCORD_TOKEN']);