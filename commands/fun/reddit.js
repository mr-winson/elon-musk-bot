const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
var randomWords = require('random-words')

module.exports = {
    name: "reddit",
    aliases: ["rdt", "subreddit"],
    category: "fun",
    description: "Sends an epic image from a selected or random subreddit",
    version: "1.2",
    new: "no sub provided? how about a random one?",
    usage: "[subreddit]",
    run: async (client, message, args) => {
        if (!args[0]) {
            const sub = randomWords()

            // Get a random image from the subreddit page
            const img = await randomPuppy(sub);
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From /r/${sub}`)
                .setURL(`https://reddit.com/r/${sub}`);
    
            message.channel.send(embed);
        } else {
            const sub = args.slice(0).join(" ")

            // Get a random image from the subreddit page
            const img = await randomPuppy(sub);
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setImage(img)
                .setTitle(`From /r/${sub}`)
                .setURL(`https://reddit.com/r/${sub}`);

            message.channel.send(embed);
        }
    }
}