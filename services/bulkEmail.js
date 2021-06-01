const Discord = require('discord.js');
const client = new Discord.Client();
const { retrieveData, hasMoreCells, updatePageInDB } = require('./notion.js');
const { bulkSend } = require('./mailer.js');

const generateMessage = (contact) => {
  return {
    from: "harshith@xhacks.ca",
    to: contact.email,
    subject: "Sponsorship Inquiry for XHacks",
    text: "Test Message. Send a DM in discord if you see this.",
  };
}

const bulkEmail = async () => {
  try {
    let success = 0;
    let fail = 0;
    while (await hasMoreCells()) {
      const data = await retrieveData();
      for (let contact of data) {
        const message = generateMessage(contact);
        const results = await bulkSend(message);
        const property = {
          'Status': {
            'select':  {
              "name": 'Sent',
            }
          },
        };
        const updateRes = await updatePageInDB(contact.pageID, property);
        if (updateRes) success++;
        else fail++;
      }
    }
    return { results: { success, fail }, error: false };
  } catch(err) {
    return { error: err };
  }
}

module.exports = {
  bulkEmail,
};
