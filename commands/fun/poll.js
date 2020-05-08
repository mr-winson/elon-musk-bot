const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    aliases: ["question"],
    category: "fun",
    description: "Ask a question and get poll results!",
    usage: "<question>",
    version: "1.0.0",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Please state a question to ask!')

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter('React to vote.')
            .setDescription(args.join(""))
            .setTitle(`Poll created by  ${message.author.username}`);

        let msg = await message.channel.send(embed);

        await msg.react('✔')
        await msg.react('🆇')
        
        message.delete({timeout: 1000})
    }
}