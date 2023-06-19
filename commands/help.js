const prefix = process.env["prefix"];

module.exports = {
  name: "help",
  description: "Gives information about the bot's usage",
  args: true,
  execute(msg, args) {
    msg.channel.send(`Use \`${prefix} echo\` to echo your message`);
    msg.channel.send(
      `Use \`${prefix} lock\` to have all messages sent by you in this channel echoed`
    );
    msg.channel.send(
      `Use \`${prefix} unlock\` to reverse the effects of \`${prefix} lock\``
    );
    msg.channel.send(
      `Note: If you use any other ${prefix} commands while locked, they will work as expected and also unlock you oops. If you put ${prefix} at the beginning of a non-command message while locked, everything except unlocking will break. You have been warned.`
    );
    return false;
  },
};
