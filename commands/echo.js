const prefix = process.env['prefix'];

module.exports = {
    name: "echo",
    description: "Echoes a message",
    args: true,
	execute(msg, args) {
        const newMsg = args.join(' ');
        msg.channel.send(newMsg);
        msg.delete();
        return false;
	},
};