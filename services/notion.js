const { Client } = require('@notionhq/client');

const dbID = '1704b527ca2f433986b767dbae84785c';
const notion = new Client({ auth: 'secret_Y1fiuCt2S4qN59wPoXdEhnihCtjwZmSwi0GfiYPO7Im' });

const addRegistration = async (data) => {
  const response = await notion.pages.create({
    parent: {
      database_id: 'de20a338de9a401cbf67d7bf8e5a83fb',
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: data.name,
            },
          },
        ],
      },
      Email: {
        email: data.email
      },
      'Grade / Year': {
        select: {
          name: data.grade,
        },
      },
      'Geographical Location': {
        select: {
          name: data.exp,
        },
      },
      'Personal Links': {
        rich_text: [
          {
            text: {
              content: data.links,
            },
          },
        ],
      },
      'Referred From': {
        select: {
          name: data.referred,
        },
      },
    },
  });
}

module.exports = {
  addRegistration
}
