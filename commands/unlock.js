const prefix = process.env["prefix"];
const username = process.env["username"];

module.exports = {
  name: "unlock",
  description: `Unlocks messages from being echoed by ${username}`,
  args: false,
  execute(msg) {
    msg.channel.send(`*(Messages unlocked from ${username})*`);
    return false;
  },
};
