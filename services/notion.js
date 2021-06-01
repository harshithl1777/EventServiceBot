const { Client } = require('@notionhq/client');

const dbID = '24030eb435ae4c2c9d3d7e988291a806';
const notion = new Client({ auth: 'secret_Y1fiuCt2S4qN59wPoXdEhnihCtjwZmSwi0GfiYPO7Im' });

const hasMoreCells = async () => {
  const { results } = await notion.databases.query({
      database_id: dbID,
      filter: {
        "and": [
          {
            "property": "Application Process",
            "select": {
              "equals": "No Process (Cold-Email)"
            }
          },
          {
            "property": "Status",
            "select": {
              "equals": "Shortlisted"
            }
          },
          {
            "property": "Department",
            "select": {
              "does_not_equal": "Special"
            }
          }
        ]
      },
  });
  return (results.length > 0) ? true : false;
}

const getDBCount = async () => {
  const { results, has_more } = await notion.databases.query({
      database_id: dbID,
      filter: {
        "and": [
          {
            "property": "Application Process",
            "select": {
              "equals": "No Process (Cold-Email)"
            }
          },
          {
            "property": "Status",
            "select": {
              "equals": "Shortlisted"
            }
          },
          {
            "property": "Department",
            "select": {
              "does_not_equal": "Special"
            }
          }
        ]
      },
  });
  if (has_more) return `${results.length}+`;
  return results.length;
}

const retrieveData = async () => {
    const { results } = await notion.databases.query({
      database_id: dbID,
      filter: {
        "and": [
          {
            "property": "Application Process",
            "select": {
              "equals": "No Process (Cold-Email)"
            }
          },
          {
            "property": "Status",
            "select": {
              "equals": "Shortlisted"
            }
          },
          {
            "property": "Department",
            "select": {
              "does_not_equal": "Special"
            }
          }
        ]
      },
    });
    const filteredData = results.map(({ id, properties }, index) => {
      return {
        dept: properties.Department.select.name, 
        email: properties['Contact Email'].rich_text[0].plain_text,
        name: properties['Contact Name'].rich_text[0].plain_text,
        company: properties['Company Name'].title[0].plain_text,
        pageID: id
      };
    });
    return filteredData;
}

const updatePageInDB = async (id, property) => {
  const response = await notion.pages.update({
    page_id: id,
    properties: property
  });
  if (response.object) return true;
  return false;
}

module.exports = {
  retrieveData,
  hasMoreCells,
  updatePageInDB,
  getDBCount
}
