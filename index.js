const { Client, Collection } = require("discord.js");
const config = require("./config.json");

if (config.BOT_TOKEN == "") {
  console.log("YOU'RE MISSING BOT TOKEN");
} else if (config.FIVEGUARD_RESOURCE_NAME == "") {
  console.log("YOU'RE MISSING FIVEGUARD RESOURCE NAME");
} else if (config.PERMISSIONS_ROLE_ID == "") {
  console.log("YOU'RE MISSING PERMISSION ROLE ID");
}

const client = new Client({
  intents: [1],
});
const root = GetResourcePath(GetCurrentResourceName());
const { loadEvents } = require(`${root}/Handlers/eventHandler`);
const { loadCommands } = require(`${root}/Handlers/commandHandler`);

client.fg = fg;
client.commands = new Collection();
client.events = new Collection();

client
  .login(config.BOT_TOKEN)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
    console.log("Started Successfully");
  })
  .catch((err) => {
    console.log(err);
  });