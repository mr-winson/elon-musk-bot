const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");

module.exports = {
    name: "love",
    aliases: ["affinity"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    usage: "<mention | id | username>",
    run: async (client, message, args) => {
        // Get a member from mention, id, or username
        let rMember = message.mentions.members.first()

        if (!args[0]) {
            return message.channel.send("Please provide a person to love!")
                .then(m => m.delete({ timeout: 10000}));
        }

        // love is the percentage
        // loveIndex is a number from 0 to 10, based on that love variable
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setColor("#ffb6c1")
            .addField(`☁ **${rMember.displayName}** loves **${message.member.displayName}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }
}