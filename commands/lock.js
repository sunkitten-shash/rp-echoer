const prefix = process.env["prefix"];
const username = process.env["username"];

module.exports = {
  name: "lock",
  description: `Locks all messages to be echoed by ${username}`,
  args: false,
  execute(msg) {
    msg.channel.send(`*(Messages locked to ${username})*`);
    return true;
  },
};
