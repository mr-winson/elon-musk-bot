const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "whois",
    aliases: ["who", "user", "info", "whoami"],
    description: "Returns user information",
    usage: "[username | id | mention]",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(message.member.joinedAt);
        /*const roles = message.member.roles
            .filter(role => role.name !== message.guild.id)
            //.map(r => r).join(", ") || 'none';*/

        // User variables

        const embed = new MessageEmbed()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('#ffffff')

            .addField('Member information:', stripIndents`**> Display name:** ${message.member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${message.member.roles.highest}`, true)

            .addField('User information:', stripIndents`**> ID:** ${message.author.id}
            **> Username:** ${message.author.username}
            **> Tag:** ${message.author.tag}
            **> Created at:** ${message.author.createdAt}`, true)
            
            .setTimestamp()

        if (message.author.presence.game) 
            embed.addField('Currently playing', stripIndents`**> Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
        console.log(`succesfully ran whois on ${message.author.tag}`)
    }
}