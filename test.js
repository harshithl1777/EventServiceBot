const Database = require("@replit/database");
const db = new Database();

db.get("emailsSent").then(val => console.log(val));
db.get("totalRegistrations").then(val => console.log(val));
db.get("dailyRegistrations").then(val => console.log(val));




