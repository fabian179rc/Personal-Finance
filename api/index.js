const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

const port = PORT || 4000;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log("% listening at 4000");
  });
});
