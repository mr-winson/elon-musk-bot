const { MessageEmbed } = require("discord.js");
var randomWords = require('random-words');

module.exports = {
    name: "image",
    aliases: ["random", "img"],
    category: "fun",
    version: "4.1",
    new: "added missing usage",
    usage: "[image to search]",
    description: "Sends an epic image from unsplash",
    run: async (client, message, args) => {
        if (!args[0]) {
            const word = randomWords()

            const img = 'https://source.unsplash.com/featured/?' + word

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From Unsplash`)
                .setURL(`https://unsplash.com/`);

            message.channel.send(embed);
        } else {
            const img = 'https://source.unsplash.com/featured/?' + args[0] +"/" + Date.now()

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From Unsplash`)
                .setURL(`https://unsplash.com/`);

            message.channel.send(embed);
        }
    }
}