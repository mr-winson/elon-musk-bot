const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "info",
    aliases: ["l", "bot-info", "version", "v", "i"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    version: "1.1.0",
    run: async (client, message, args) => {

        let me = client.user;
        let website = "Still in the making!";
        let title = "Bot info";
        let music =  process.env.ELONMUSIC
        let offserver = process.env.OFFSERVER
        let merch = "Still in the making!";
        let invite = process.env.INVITELINK;
        let trello = process.env.TRELLO;
        let github = process.env.GITHUB;
        let donate = process.env.DONATE;
        let boat = process.env.BOATSERVER;
        let servers = `We are in ${client.guilds.cache.size} servers!`;

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(title)
            .addField("Bot information", stripIndents`**> Username:** ${me}\n
            **> Why dont you invite Elon Musik!** ${music}\n
            **> Why dont you join the official server!** ${offserver}\n
            **> Boat Development server? I make what you guys tell me to!** ${boat}\n
            **> Website** ${website}\n
            **> Merch:** ${merch}\n
            **> Server count:** ${servers}\n
            **> Donations are what keep us going, how about a coffee?** ${donate}\n 
            **> Invite link:** ${invite}\n
            **> Trello link:** ${trello}\n
            **> GitHub link:** ${github}\n   `) 
            .addField(`Contact:`,`\nhttps://mrwinson.me/eon-email`)
 

        
        message.channel.send(embed)
    }
}