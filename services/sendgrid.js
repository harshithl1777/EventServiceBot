const request = require("request");

const addNewContact = async (contact, first, last) => {
    var options = { 
      method: 'PUT',
      url: 'https://api.sendgrid.com/v3/marketing/contacts',
      headers: { 
        'content-type': 'application/json',
        authorization: `Bearer ${process.env['SEND_GRID_KEY']}`
      },
      body: { 
        contacts: 
          [ 
            { 
              email: contact,
              first_name: first,
              last_name: last
            } 
          ] 
      },
      json: true 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
}

module.exports = {
  addNewContact,
}