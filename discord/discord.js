const Discord = require('discord.js');
const { commands } = require('./commands.json');
const { bulkEmail } = require('../services/bulkEmail.js');
const discordMail = require('./helpers/mail.js');
const { getDBCount } = require('../services/notion.js');

const client = new Discord.Client();
const guildID = '813918134678585344';


client.on('ready', () => {
  client.api.applications(client.user.id).guilds(guildID).commands.post({
    data: commands
  });

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const id = interaction.member.user.id;
    
    switch (command) {
      case 'bulk_email':
        const numOfEmails = await getDBCount();
        const loadingEmbed = discordMail.createLoadingEmbed(numOfEmails, id);
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: { embeds: [loadingEmbed] }
          }
        });
        const { results, error } = await bulkEmail();
        if (!error) {
          client.channels.cache.get('843306954814390314').send(`<@!${id}>`)
          const successEmbed = discordMail.createSuccessEmbed(results.success, results.fail, id);
          client.channels.cache.get('843306954814390314').send(successEmbed);
        } else {
          client.channels.cache.get('843306954814390314').send(`<@!${id}>`)
          const errorEmbed = discordMail.createErrorEmbed(error, id);
          client.channels.cache.get('843306954814390314').send(errorEmbed);
        }
        break
    }
  });
});

client.login(process.env['DISCORD_TOKEN']);