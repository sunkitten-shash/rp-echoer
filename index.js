const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require("./server");

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

let isLocked = false;
//boolean; if true, all messages will be echoed by this bot
//if false, you have to specifically request an echo

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

console.log(client);

//get the config file, and if it doesn't exist, manually set some stuff
//currently only has command prefix
const prefix = process.env["prefix"];
const token = process.env["token"];
const status = process.env["status"];

keepAlive();

client.login(token);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: status } });
});

client.on("message", (msg) => {
  console.log(msg);
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    //split the message into its component words
    const cmdText = args.shift().toLowerCase();
    //the command is the first word
    //TODO: change if you want just a loose hanging prefix for the simple echo

    if (!client.commands.has(cmdText)) return;

    const cmd = client.commands.get(cmdText);

    try {
      isLocked = cmd.execute(msg, args);
    } catch (e) {
      console.error(e);
      msg.reply("error executing command");
    }
  } else if (isLocked === true) {
    msg.channel.send(msg.content);
    msg.delete();
    return;
  }
});
