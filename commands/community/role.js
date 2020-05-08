const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "role",
    aliases: ["rme", "r"],
    category: "community",
    description: "Gives you the role of verified.",
    usage: "<I agree>",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        const role = message.guild.roles.cache.find(role => role.name === 'verified');

        if (args[0] !== 'agreed') {
            return message.channel.send("Please say 'agreed' exactly.")
                .then(m => m.delete({ timeout: 10000}));
        }

        const embed = new MessageEmbed()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(`Congrats\n${message.member.displayName} has been verified!`);

        message.channel.send(embed).then(m => m.delete({ timeout: 10000}));
        message.member.roles.add(role);
    }
}